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
const paymentSentInterface = new Interface([
  "event PaymentSent(address indexed recipient, address indexed payer, address indexed token, uint256 amount, string paymentReference, string handle)"
]);

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
  const contract = getReadContractWithAddress(chainId, contractAddressOverride);
  if (!contract) return null;

  try {
    const profile = await contract.getProfileByHandle(handle);
    return normalizeProfile(profile);
  } catch {
    return null;
  }
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

  const logs = await provider.getLogs({
    address: contractAddress,
    topics: [eventTopic, paddedRecipient],
    fromBlock: getContractDeploymentBlock(chainId),
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
        tokenSymbol: token?.symbol || "Token",
        timestamp: block ? Number(block.timestamp) : null
      };
    })
  );
}
