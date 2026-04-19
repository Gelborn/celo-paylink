import hre from "hardhat";
import { getSupportedTokens } from "../lib/tokens";

async function main() {
  const address =
    process.env.PAYLINK_CONTRACT_ADDRESS_SEPOLIA ||
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA;

  if (!address) {
    throw new Error("Missing PAYLINK_CONTRACT_ADDRESS_SEPOLIA in .env");
  }

  const [signer] = await hre.ethers.getSigners();
  const tokens = getSupportedTokens(11142220);
  const preferredToken = tokens[0]?.address;

  if (!preferredToken) {
    throw new Error("No supported token configured for Celo Sepolia.");
  }

  const contract = await hre.ethers.getContractAt(
    "PayLinkProfile",
    address,
    signer
  );

  const tx = await contract.setProfile(
    "demo-paylink",
    "Demo Creator",
    "Accept stablecoin tips and lightweight invoice payments.",
    "Thanks for supporting my work on Celo.",
    preferredToken
  );

  await tx.wait();

  console.log("Seeded profile with tx:", tx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
