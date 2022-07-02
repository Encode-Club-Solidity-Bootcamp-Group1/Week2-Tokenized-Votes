import deploy from "./deployments";
import getWalletAccount from "./getWalletAccount";

async function main() {
  const signer = await getWalletAccount();
  const ballotAddress = await deploy(signer, "Allen", "russ", "Kuro", "IKA");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
