import { ethers } from "ethers";
import "dotenv/config";
import * as voteTokenJson from "../artifacts/contracts/Token.sol/MyToken.json";
// eslint-disable-next-line node/no-missing-import

// This key is already public on Herong's Tutorial Examples - v1.03, by Dr. Herong Yang
// Do never expose your keys like this
const EXPOSED_KEY =
  "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";

async function main() {
  const provider = ethers.providers.getDefaultProvider("ropsten");
  const signer = new ethers.Wallet(
    process.env.PRIVATE_KEY ?? EXPOSED_KEY
  ).connect(provider);
  console.log(`Using address ${signer.address}`);
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }

  const voteTokenContractFactory = new ethers.ContractFactory(
    voteTokenJson.abi,
    voteTokenJson.bytecode,
    signer
  );
  const voteTokenContract = await voteTokenContractFactory.deploy();
  await voteTokenContract.deployed();
  console.log(
    "Deploied token contreact - address -",
    voteTokenContract.address
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
