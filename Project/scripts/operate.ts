import deployToken from "./deploy-token";
import deployBallot from "./deploy-ballot";
import mintAndDelegateToAddress from "./mint-and-delegate-to-address";
import voteByDelegatee from "./vote-by-delegatee-address";
import getWalletAccount from "./getWalletAccount";
import queryVotingResult from "./query-voting-results";
import "dotenv/config";

async function main() {
  const ownerSigner = await getWalletAccount(
    process.env.PRIVATE_KEY,
    process.env.MNEMONIC
  );
  const otherSigner = await getWalletAccount(
    process.env.PRIVATE_KEY1,
    process.env.MNEMONIC
  );

  const votingTokenContractAddress = await deployToken(ownerSigner);

  await mintAndDelegateToAddress(
    votingTokenContractAddress,
    ownerSigner,
    otherSigner
  );

  const ballotContractAddress = await deployBallot(
    ownerSigner,
    votingTokenContractAddress,
    "Allen",
    "russ",
    "Kuro",
    "IKA",
    "Sharan"
  );

  await voteByDelegatee(otherSigner, ballotContractAddress);

  await queryVotingResult(otherSigner, ballotContractAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
