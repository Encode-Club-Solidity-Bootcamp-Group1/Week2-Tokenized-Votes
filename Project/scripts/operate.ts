import deploy from "./deployments";
import getWalletAccount from "./getWalletAccount";
import "dotenv/config";

async function main() {
  const ownerSigner = await getWalletAccount(
    process.env.PRIVATE_KEY,
    process.env.MNEMONIC
  );
  const ballotAddress = await deploy(
    ownerSigner,
    "Allen",
    "russ",
    "Kuro",
    "IKA"
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
