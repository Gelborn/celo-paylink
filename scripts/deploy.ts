import hre from "hardhat";
import { getSupportedTokenAddresses } from "../lib/tokens";

async function main() {
  const { ethers } = await hre.network.create();
  const connectedNetwork = await ethers.provider.getNetwork();
  const chainId = Number(connectedNetwork.chainId);
  const allowedTokens = getSupportedTokenAddresses(chainId);

  const contract = await ethers.deployContract("PayLinkProfile", [allowedTokens]);
  await contract.waitForDeployment();

  console.log("PayLinkProfile deployed");
  console.log("network:", hre.globalOptions.network);
  console.log("chainId:", chainId);
  console.log("address:", await contract.getAddress());
  console.log("allowedTokens:", allowedTokens.join(", "));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
