import deployToken from "./deploy-token";
import deployBallot from "./deploy-ballot";
import getWalletAccount from "./getWalletAccount";
import "dotenv/config";

async function main() {
  const ownerSigner = await getWalletAccount(
    process.env.PRIVATE_KEY,
    process.env.MNEMONIC
  );
  const votingTokenContractAddress = await deployToken(ownerSigner);
  // todo  do minting actions
  const ballotContractAddress = await deployBallot(
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
