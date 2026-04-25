import { Contract, Interface, JsonRpcProvider } from "ethers";
import type { Hex } from "viem";
import { payLinkAbi } from "./abi";
import {
  getContractAddress,
  getContractDeploymentBlock,
  getDefaultChainId,
  getExplorerBaseUrl,
  getRpcUrl
} from "./chains";
import { getTokenByAddress } from "./tokens";

export type ProfileRecord = {
  owner: Hex;
  handle: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  paymentMessage: string;
  preferredToken: Hex;
  exists: boolean;
};

export type PaymentRecord = {
  recipient: Hex;
  payer: Hex;
  token: Hex;
  amount: bigint;
  reference: string;
  handle: string;
  txHash: Hex;
  blockNumber: bigint;
  explorerUrl: string;
  tokenSymbol: string;
  timestamp: number | null;
};

const providers = new Map<number, JsonRpcProvider>();
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const paymentSentInterface = new Interface([
  "event PaymentSent(address indexed recipient, address indexed payer, address indexed token, uint256 amount, string paymentReference, string handle)"
]);
const profileSetInterface = new Interface([
  "event ProfileSet(address indexed owner, string handle, string displayName, string avatarUrl, address preferredToken)"
]);

type EventLogLike = {
  data: string;
  topics: readonly string[];
};

function getProvider(chainId = getDefaultChainId()) {
  if (!providers.has(chainId)) {
    providers.set(chainId, new JsonRpcProvider(getRpcUrl(chainId)));
  }

  return providers.get(chainId)!;
}

function getReadContract(chainId = getDefaultChainId()) {
  const address = getContractAddress(chainId);
  if (!address) return null;

  return new Contract(address, payLinkAbi, getProvider(chainId));
}

function getReadContractWithAddress(
  chainId = getDefaultChainId(),
  contractAddressOverride?: Hex | null
) {
  const address = contractAddressOverride || getContractAddress(chainId);
  if (!address) return null;

  return new Contract(address, payLinkAbi, getProvider(chainId));
}

function normalizeProfile(profile: {
  owner: string;
  handle: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  paymentMessage: string;
  preferredToken: string;
  exists: boolean;
}): ProfileRecord {
  return {
    owner: profile.owner as Hex,
    handle: profile.handle,
    displayName: profile.displayName,
    avatarUrl: profile.avatarUrl,
    bio: profile.bio,
    paymentMessage: profile.paymentMessage,
    preferredToken: profile.preferredToken as Hex,
    exists: profile.exists
  };
}

export async function fetchProfileByOwner(
  owner: Hex,
  chainId = getDefaultChainId(),
  contractAddressOverride?: Hex | null
) {
  const contract = getReadContractWithAddress(chainId, contractAddressOverride);
  if (!contract) return null;

  try {
    const profile = await contract.getProfile(owner);
    return normalizeProfile(profile);
  } catch {
    return null;
  }
}

export async function fetchProfileByHandle(
  handle: string,
  chainId = getDefaultChainId(),
  contractAddressOverride?: Hex | null
) {
  try {
    return await fetchProfileByHandleIfExists(
      handle,
      chainId,
      contractAddressOverride
    );
  } catch {
    return null;
  }
}

export async function fetchProfileByHandleIfExists(
  handle: string,
  chainId = getDefaultChainId(),
  contractAddressOverride?: Hex | null
) {
  const contract = getReadContractWithAddress(chainId, contractAddressOverride);
  if (!contract) return null;

  const owner = (await contract.resolveHandle(handle)) as string;
  if (owner.toLowerCase() === ZERO_ADDRESS) {
    return null;
  }

  const profile = await contract.getProfile(owner);
  return normalizeProfile(profile);
}

export function collectLatestProfileSetOwners(
  logs: readonly EventLogLike[],
  limit: number
) {
  if (limit <= 0) return [] as Hex[];

  const owners: Hex[] = [];
  const seenOwners = new Set<string>();

  for (const log of [...logs].reverse()) {
    let parsed;

    try {
      parsed = profileSetInterface.parseLog({
        data: log.data,
        topics: [...log.topics]
      });
    } catch {
      continue;
    }

    const owner = parsed?.args.owner as string | undefined;
    if (!owner) continue;

    const ownerKey = owner.toLowerCase();
    if (seenOwners.has(ownerKey)) continue;

    seenOwners.add(ownerKey);
    owners.push(owner as Hex);

    if (owners.length >= limit) {
      break;
    }
  }

  return owners;
}

function getProfileDisplayNameKey(profile: ProfileRecord) {
  return profile.displayName.trim().toLowerCase();
}

export function dedupeProfilesByDisplayName(
  profiles: readonly ProfileRecord[]
) {
  const seenNames = new Set<string>();
  const uniqueProfiles: ProfileRecord[] = [];

  for (const profile of profiles) {
    const nameKey = getProfileDisplayNameKey(profile);

    if (nameKey && seenNames.has(nameKey)) {
      continue;
    }

    if (nameKey) {
      seenNames.add(nameKey);
    }

    uniqueProfiles.push(profile);
  }

  return uniqueProfiles;
}

export async function fetchRecentProfiles(
  chainId = getDefaultChainId(),
  contractAddressOverride?: Hex | null,
  limit = 24
) {
  const contractAddress = contractAddressOverride || getContractAddress(chainId);
  const contract = getReadContractWithAddress(chainId, contractAddressOverride);
  if (!contractAddress || !contract) return [] as ProfileRecord[];

  const provider = getProvider(chainId);
  const eventTopic = profileSetInterface.getEvent("ProfileSet")!.topicHash;
  const configuredFromBlock = getContractDeploymentBlock(chainId);
  const latestBlock = BigInt(await provider.getBlockNumber());
  const fromBlock =
    configuredFromBlock > 0n
      ? configuredFromBlock
      : latestBlock > 250_000n
        ? latestBlock - 250_000n
        : 0n;

  const logs = await provider.getLogs({
    address: contractAddress,
    topics: [eventTopic],
    fromBlock,
    toBlock: "latest"
  });
  const owners = collectLatestProfileSetOwners(logs, limit * 4);
  const hydrated = await Promise.allSettled(
    owners.map(async (owner) => normalizeProfile(await contract.getProfile(owner)))
  );

  const profiles = hydrated
    .flatMap((result) => (result.status === "fulfilled" ? [result.value] : []));

  return dedupeProfilesByDisplayName(profiles).slice(0, limit);
}

export async function fetchRecentPayments(
  recipient: Hex,
  chainId = getDefaultChainId(),
  contractAddressOverride?: Hex | null
) {
  const contractAddress = contractAddressOverride || getContractAddress(chainId);
  if (!contractAddress) return [] as PaymentRecord[];

  const provider = getProvider(chainId);
  const eventTopic = paymentSentInterface.getEvent("PaymentSent")!.topicHash;
  const paddedRecipient = `0x${recipient.slice(2).padStart(64, "0")}`;
  const configuredFromBlock = getContractDeploymentBlock(chainId);

  try {
    const latestBlock = BigInt(await provider.getBlockNumber());
    const fromBlock =
      configuredFromBlock > 0n
        ? configuredFromBlock
        : latestBlock > 250_000n
          ? latestBlock - 250_000n
          : 0n;

    const logs = await provider.getLogs({
      address: contractAddress,
      topics: [eventTopic, paddedRecipient],
      fromBlock,
      toBlock: "latest"
    });

    const recent = logs.slice(-8).reverse();

    return Promise.all(
      recent.map(async (log) => {
        const parsed = paymentSentInterface.parseLog(log);
        if (!parsed) {
          throw new Error("Could not parse PaymentSent log.");
        }
        const block = await provider.getBlock(log.blockNumber);
        const token = getTokenByAddress(parsed.args.token, chainId);

        return {
          recipient: parsed.args.recipient as Hex,
          payer: parsed.args.payer as Hex,
          token: parsed.args.token as Hex,
          amount: parsed.args.amount as bigint,
          reference: parsed.args.paymentReference as string,
          handle: parsed.args.handle as string,
          txHash: log.transactionHash as Hex,
          blockNumber: BigInt(log.blockNumber),
          explorerUrl: `${getExplorerBaseUrl(chainId)}/tx/${log.transactionHash}`,
          tokenSymbol: token?.symbol || "",
          timestamp: block ? Number(block.timestamp) : null
        };
      })
    );
  } catch (error) {
    console.error("Failed to fetch recent payments", error);
    return [];
  }
}
