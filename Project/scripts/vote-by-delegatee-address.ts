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

  console.log("Voting Power before");
  const votingPower = await ballotContract.votingPower();
  console.log(ethers.utils.formatEther(votingPower));

  const voteTx = await ballotContract.vote(1, ethers.utils.parseEther("1"));
  console.log("Vote to first proposal with 1 Token", voteTx.hash);

  await voteTx.wait(1);

  console.log("Voting Power After");
  const votingPowerAfter = await ballotContract.votingPower();
  console.log(ethers.utils.formatEther(votingPowerAfter));
}

export default main;
