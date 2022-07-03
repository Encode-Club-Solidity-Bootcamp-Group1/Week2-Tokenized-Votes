// import { ethers } from "ethers";
import { ethers } from "ethers";
import "dotenv/config";
import * as ballotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import * as tokenJson from "../artifacts/contracts/Token.sol/MyToken.json";
import getWalletAccount from "./getWalletAccount";
import getAccountAddress from "./getAccountsFromMnemonic";

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

async function main(signer: ethers.Wallet, ...proposals: string[]) {
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
  // Deploy MyToken Contract
  // =================================================================
  console.log("Deploying MyToken contract");
  const tokenFactory = new ethers.ContractFactory(
    tokenJson.abi,
    tokenJson.bytecode,
    signer
  );
  const tokenContract = await tokenFactory.deploy();
  console.log("Awaiting confirmations");
  await tokenContract.deployed();
  console.log("MyToken contract deployed completed");
  console.log(`Contract deployed at ${tokenContract.address}`);
  // =================================================================
  // Minting Token to some address
  // =================================================================
  const recipientAccountAddress= await getAccountAddress(
    process.env.PRIVATE_KEY,
    process.env.MNEMONIC,
    process.env.ACCOUNTS
  );
  const tokenAmounts = 5;
  console.log(`Minting ${tokenAmounts} tokens for wallet address ${recipientAccountAddress}`);
  await tokenContract.mint(recipientAccountAddress , tokenAmounts);
  console.log(`Account ${recipientAccountAddress} has ${await tokenContract.balanceOf(recipientAccountAddress)} tokens`);
  console.log(`Account ${recipientAccountAddress} has ${await tokenContract.getVotes(recipientAccountAddress)} voting power before delegation`);
  
  // =================================================================
  // Self Delegating
  // =================================================================
  await tokenContract.delegate(recipientAccountAddress); 
  console.log(`Account ${recipientAccountAddress} has ${await tokenContract.getVotes(recipientAccountAddress)} voting power after delegation`);

  // =================================================================
  // Check the proposals
  // =================================================================
  console.log("Proposals: ");
  if (proposals.length < 2) throw new Error("Not enough proposals provided");
  proposals.forEach((element, index) => {
    console.log(`Proposal N. ${index + 1}: ${element}`);
  });

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
    tokenContract.address
  );
  console.log("Awaiting confirmations");
  await ballotContract.deployed();
  console.log("Completed");
  console.log(`Contract deployed at ${ballotContract.address}`);
}


export default main;
