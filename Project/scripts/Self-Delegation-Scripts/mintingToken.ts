import { ethers } from "ethers";
import getWallet from "./getWalletFromMnemonic";

async function main(tokenContract : ethers.Contract , tokenAmounts : string , minterWallet : ethers.Wallet) {

// =================================================================
  // Minting Token to some address
  // =================================================================
  console.log("========== Start Minting Token ==========");
  
  const recipientWallet= await getWallet(
    process.env.PRIVATE_KEY,
    process.env.MNEMONIC,
    process.env.ACCOUNTS
  );

  const minterAddress = await minterWallet.address;

  console.log(`Minting ${tokenAmounts} tokens for wallet address ${minterAddress}`);
  const mintTx = await tokenContract.mint(
    minterAddress ,
    ethers.utils.parseEther(tokenAmounts)
    );
    await mintTx.wait();
  console.log(`Account ${minterAddress} has ${await tokenContract.balanceOf(minterAddress)} tokens`);
  console.log(`Account ${minterAddress} has ${await tokenContract.getVotes(minterAddress)} voting power before delegation`);
  
}

export default main;