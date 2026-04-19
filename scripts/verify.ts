import hre from "hardhat";
import { getSupportedTokenAddresses } from "../lib/tokens";

function getContractAddressForNetwork(networkName: string) {
  if (networkName === "celo") {
    return process.env.PAYLINK_CONTRACT_ADDRESS_MAINNET;
  }

  if (networkName === "celoSepolia") {
    return process.env.PAYLINK_CONTRACT_ADDRESS_SEPOLIA;
  }

  return undefined;
}

async function main() {
  const network = await hre.ethers.provider.getNetwork();
  const chainId = Number(network.chainId);
  const address = getContractAddressForNetwork(hre.network.name);

  if (!address) {
    throw new Error(
      `Missing contract address env for ${hre.network.name}. Set PAYLINK_CONTRACT_ADDRESS_MAINNET or PAYLINK_CONTRACT_ADDRESS_SEPOLIA.`
    );
  }

  const constructorArguments = [getSupportedTokenAddresses(chainId)];

  await hre.run("verify:verify", {
    address,
    constructorArguments
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
