import "dotenv/config";
import { ethers } from "ethers"
import * as tokenJson from "../artifacts/contracts/Token.sol/MyToken.json";
import { MyToken } from "../typechain";
const EXPOSED_KEY = '8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f';

async function main() {
    const provider = ethers.providers.getDefaultProvider('ropsten')
    const signer = new ethers.Wallet(
        process.env.PRIVATE_KEY ?? EXPOSED_KEY
    ).connect(provider)
    console.log('signer address', signer.address)

    const balance = Number(ethers.utils.formatEther(await signer.getBalance()));
    console.log(`Wallet balance ${balance}`);
    if (balance < 0.01) {
      throw new Error("Not enough ether");
    }

    if (process.argv.length < 3) throw Error('Token Address is missing')

    const tokenAddress = process.argv[2]
    console.log('tokenAddress', tokenAddress)

    const tokenContract = new ethers.Contract(
        tokenAddress,
        tokenJson.abi,
        signer
    ) as MyToken
    console.log('token contract address', tokenContract.address)

    const preDelegateVotes = await tokenContract.getVotes(signer.address)
    console.log('pre delegate votes',preDelegateVotes.toString())

    const txDelegate = await tokenContract.delegate(signer.address)
    console.log('awaiting confirmations delegate')
    await txDelegate.wait()
    console.log('delegate transaction hash', txDelegate.hash)

    const postDelegateVotes = await tokenContract.getVotes(signer.address)
    console.log('post delegate votes',postDelegateVotes.toString())
}
main().catch(error => {
    console.log('main error', error)
    process.exit(1)
})