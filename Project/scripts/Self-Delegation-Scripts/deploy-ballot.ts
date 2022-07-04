import { ethers } from "ethers";
import * as ballotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";

function convertStringArrayToBytes32(array: string[]) {
    const bytes32Array = [];
    for (let index = 0; index < array.length; index++) {
      bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
    }
    return bytes32Array;
  }


async function main(signer: ethers.Wallet, deployedTokenContractAddress: string,  ...proposals: string[]) {
  // =================================================================
  // Check the proposals
  // =================================================================
  console.log("========== Available Proposals to vote ==========");
  if (proposals.length < 2) throw new Error("Not enough proposals provided");
  proposals.forEach((element, index) => {
    console.log(`Proposal N. ${index + 1}: ${element}`);
  });

 // =================================================================
 // Check Wallet Balance
 // =================================================================
  
    const balanceBN = await signer.getBalance();
    const balance = Number(ethers.utils.formatEther(balanceBN));
    console.log(`Wallet balance ${balance}`);
    if (balance < 0.01) {
      throw new Error("Not enough ether");
    }

  // =================================================================
  // Deploy CustomBallot Contract
  // =================================================================
  const ballotFactory = new ethers.ContractFactory(
    ballotJson.abi,
    ballotJson.bytecode,
    signer
  );
  const ballotContract = await ballotFactory.deploy(
    convertStringArrayToBytes32(proposals),
    deployedTokenContractAddress
  );
  console.log("Awaiting confirmations");
  await ballotContract.deployed();
  console.log("Custom Ballot Contract Deployment Completed");
  console.log(`Custom BalloContract deployed at ${ballotContract.address}`);
  await ballotContract.deployTransaction.wait(2); 
  return ballotContract.address;
  }

  export default main;