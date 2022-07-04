import { Contract, ethers } from "ethers";
import * as ballotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import { CustomBallot } from "../typechain";

async function main(signer: ethers.Wallet, ballotContractAddress: string) {

    const ballotContract: CustomBallot = new Contract(
        ballotContractAddress,
        ballotJson.abi,
        signer
      ) as CustomBallot;


      const votingPowerBefore = await ballotContract.votingPower();

      console.log(`Ballot Contract - Voting Power BEFORE Voting for Address ${signer.address} is ${ethers.utils.formatEther(votingPowerBefore)}`);

    
      const voteTx = await ballotContract.vote(1, ethers.utils.parseEther("1"));  //Throw Error !!!


      console.log("Vote to first proposal with 1 Token", voteTx.hash);
    

      await voteTx.wait(1);
    

      const votingPowerAfter = await ballotContract.votingPower();

      console.log(`Ballot Contract - Voting Power AFTER Voting for Address ${signer.address} is ${ethers.utils.formatEther(votingPowerAfter)}`);

}

export default main;