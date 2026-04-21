import hre from "hardhat";
import { verifyContract } from "@nomicfoundation/hardhat-verify/verify";
import { serverEnv } from "../lib/server-env";
import { getSupportedTokenAddresses } from "../lib/tokens";

function getContractAddressForNetwork(networkName: string) {
  if (networkName === "celo") {
    return serverEnv.paylinkContractAddressMainnet;
  }

  if (networkName === "celoSepolia") {
    return serverEnv.paylinkContractAddressSepolia;
  }

  return undefined;
}

function getVerificationProviderForNetwork(networkName: string) {
  if (networkName === "celo") {
    return "etherscan" as const;
  }

  if (networkName === "celoSepolia") {
    return "blockscout" as const;
  }

  return undefined;
}

async function main() {
  const networkName = hre.globalOptions.network;
  const { ethers } = await hre.network.create();
  const connectedNetwork = await ethers.provider.getNetwork();
  const chainId = Number(connectedNetwork.chainId);
  const address = getContractAddressForNetwork(networkName);
  const provider = getVerificationProviderForNetwork(networkName);

  if (!address) {
    throw new Error(
      `Missing contract address env for ${networkName}. Set PAYLINK_CONTRACT_ADDRESS_MAINNET or PAYLINK_CONTRACT_ADDRESS_SEPOLIA.`
    );
  }

  if (!provider) {
    throw new Error(`Unsupported verification network: ${networkName}`);
  }

  await verifyContract(
    {
      address,
      constructorArgs: [getSupportedTokenAddresses(chainId)],
      provider
    },
    hre
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
