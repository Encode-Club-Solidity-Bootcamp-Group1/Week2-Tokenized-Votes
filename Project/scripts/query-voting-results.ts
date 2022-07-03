import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as ballotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
// eslint-disable-next-line node/no-missing-import
import { CustomBallot } from "../typechain";

async function main(signer: ethers.Wallet, ballotContractAddress: string) {
  const ballotContract: CustomBallot = new Contract(
    ballotContractAddress,
    ballotJson.abi,
    signer
  ) as CustomBallot;

  const winnderProposal = await ballotContract.winningProposal();
  const winnerName = await ballotContract.winnerName();
  const winnerVotedCount = await (
    await ballotContract.proposals(winnderProposal)
  ).voteCount;
  console.log(
    `The winning proposal is: ${ethers.utils.parseBytes32String(winnerName)}`
  );
  console.log(`The winning proposal count: ${winnerVotedCount}`);
}

export default main;
