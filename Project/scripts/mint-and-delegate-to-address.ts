import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as voteTokenJson from "../artifacts/contracts/Token.sol/MyToken.json";
// eslint-disable-next-line node/no-missing-import
import { MyToken } from "../typechain";

async function main(
  votingTokenAddress: string,
  ownerSigner: ethers.Wallet,
  otherSigner: ethers.Wallet
) {
  const voteTokenContract: MyToken = new Contract(
    votingTokenAddress,
    voteTokenJson.abi,
    ownerSigner
  ) as MyToken;

  console.log("========= Details =========");
  console.log("Voting Token  Address - ", voteTokenContract.address);
  console.log("Delegate Voting To Address - ", otherSigner.address);

  // mint and delegate
  const mintTx = await voteTokenContract.mint(
    ownerSigner.address,
    ethers.utils.parseEther("100")
  );
  await mintTx.wait(1);
  console.log("Mint tokens for address", ownerSigner.address);
  console.log("Mint transacton", mintTx.hash);

  const delegateTx = await voteTokenContract.delegate(otherSigner.address);
  await delegateTx.wait(1);
  console.log(
    "Delegate vote from",
    ownerSigner.address,
    "To",
    otherSigner.address
  );
  console.log("Delegate transaction", delegateTx.hash);
}

export default main;
