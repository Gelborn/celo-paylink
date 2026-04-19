import hre from "hardhat";
import { getSupportedTokenAddresses } from "../lib/tokens";

async function main() {
  const network = await hre.ethers.provider.getNetwork();
  const chainId = Number(network.chainId);
  const allowedTokens = getSupportedTokenAddresses(chainId);

  const PayLinkProfile = await hre.ethers.getContractFactory("PayLinkProfile");
  const contract = await PayLinkProfile.deploy(allowedTokens);
  await contract.waitForDeployment();

  console.log("PayLinkProfile deployed");
  console.log("network:", hre.network.name);
  console.log("chainId:", chainId);
  console.log("address:", await contract.getAddress());
  console.log("allowedTokens:", allowedTokens.join(", "));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
