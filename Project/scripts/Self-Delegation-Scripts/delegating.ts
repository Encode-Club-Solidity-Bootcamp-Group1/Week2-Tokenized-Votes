import { Contract, ethers } from "ethers";
import getWallet from "./getWalletFromMnemonic";
import * as voteTokenJson from "../../artifacts/contracts/Token.sol/MyToken.json";
import { MyToken } from "../../typechain";

async function main(tokenContract: ethers.Contract, ownerSigner : ethers.Wallet, signerTo : ethers.Wallet ) {

  // =================================================================
  // Delegating
  // =================================================================

  const voteTokenContract: MyToken = new Contract(  
    tokenContract.address,
    voteTokenJson.abi,
    ownerSigner
  ) as MyToken;

  console.log("========== Start Delegation Process ==========");
  const delegateTx = await voteTokenContract.delegate(signerTo.address); 
  await delegateTx.wait(1);
  console.log(`Account ${signerTo.address} has ${await tokenContract.getVotes(signerTo.address)} voting power after delegation`);

}
    
export default main;