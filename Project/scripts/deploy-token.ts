import { ethers } from "ethers";
import * as tokenJson from "../artifacts/contracts/Token.sol/MyToken.json";

async function main(signer: ethers.Wallet) {
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
  return tokenContract.address;
}

export default main;
