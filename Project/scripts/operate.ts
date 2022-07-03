import deployToken from "./deploy-token";
import deployBallot from "./deploy-ballot";
import getSigner from "./getSigner";
import mintingToken from "./mintingToken";
import delegating from "./delegating";
import voteByDelegatee from "./vote-by-delegatee-address";
import "dotenv/config";

async function main() {

  const ownerSigner = await getSigner(  // Owner account
  process.env.PRIVATE_KEY,
  process.env.MNEMONIC,
  process.env.ACCOUNTS
);

const signerOne = await getSigner( 
  process.env.PRIVATE_KEY,
  process.env.MNEMONIC,
  process.env.ACCOUNTS1
);

const signerTwo = await getSigner(  
  process.env.PRIVATE_KEY,
  process.env.MNEMONIC,
  process.env.ACCOUNTS2
);

//Owner deploys the voting token contract
const votingTokenContract =  await deployToken(ownerSigner);

//Owner is minting 5 tokens for himself
await mintingToken(votingTokenContract , "5", ownerSigner);  

//Self Delegation - Owner is delegating to himself
await delegating(votingTokenContract, ownerSigner, ownerSigner); 
 
//Owner deploys the ballot contract
const ballotContract = await deployBallot(
  ownerSigner,
  votingTokenContract.address,
  "Allen",
  "russ",
  "Kuro",
  "IKA"
);

//Owner votes
await voteByDelegatee(signerOne,ballotContract);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
