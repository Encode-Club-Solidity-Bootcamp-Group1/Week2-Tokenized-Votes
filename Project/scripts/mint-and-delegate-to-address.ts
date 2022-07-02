import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as ballotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import * as voteTokenJson from "../artifacts/contracts/Token.sol/MyToken.json";
// eslint-disable-next-line node/no-missing-import
import { CustomBallot, MyToken } from "../typechain";

// This key is already public on Herong's Tutorial Examples - v1.03, by Dr. Herong Yang
// Do never expose your keys like this
const EXPOSED_KEY =
  "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";

async function main() {
  const provider = ethers.providers.getDefaultProvider("ropsten");
  const signer = new ethers.Wallet(
    process.env.PRIVATE_KEY ?? EXPOSED_KEY
  ).connect(provider);

  // signer - with private key of "Delegate To Address" wallet from env file
  const singer2 = new ethers.Wallet(
    process.env.PRIVATE_KEY1 || EXPOSED_KEY
  ).connect(provider);

  console.log("Signer: ", signer.address);
  console.log("Another Signer: ", singer2.address);

  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }

  if (process.argv.length < 3) throw new Error("Token Address");
  const tokenAddress = process.argv[2];
  if (process.argv.length < 4) throw new Error("Delegate to Address");
  const delegateWalletAddress = process.argv[3];

  // const ballotFactory = new ethers.ContractFactory(
  //   ballotJson.abi,
  //   ballotJson.bytecode,
  //   signer
  // );
  // const voteTokenContractFactory = new ethers.ContractFactory(
  //   voteTokenJson.abi,
  //   voteTokenJson.bytecode,
  //   signer
  // );

  const voteTokenContract: MyToken = new Contract(
    tokenAddress,
    voteTokenJson.abi,
    signer
  ) as MyToken;

  console.log("========= Details =========");
  console.log("Voting Token  Address - ", voteTokenContract.address);
  console.log("Delegate Voting To Address - ", delegateWalletAddress);

  // mint and delegate
  const mintTx = await voteTokenContract.mint(
    delegateWalletAddress,
    ethers.utils.parseEther("100")
  );
  await mintTx.wait(1);
  console.log("Mint tokens for address", signer.address);
  console.log("Mint transacton", mintTx.hash);

  const delegateTx = await voteTokenContract.delegate(delegateWalletAddress);
  await delegateTx.wait(1);
  console.log(
    "Delegate vote from",
    signer.address,
    "To",
    delegateWalletAddress
  );
  console.log("Delegate transaction", delegateTx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});