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
    if (process.argv.length < 4) throw Error('To Address is missing')
    if (process.argv.length < 5) throw Error('Mint Amount is missing')

    const tokenAddress = process.argv[2]
    const toAddress = process.argv[3]
    const mintValue = process.argv[4]
    console.log('tokenAddress', tokenAddress)
    console.log('toAddress', toAddress)
    console.log('mintValue', mintValue)

    const tokenContract = new ethers.Contract(
        tokenAddress,
        tokenJson.abi,
        signer
    ) as MyToken
    console.log('token contract address', tokenContract.address)

    const preMintVotes = await tokenContract.getVotes(toAddress)
    console.log('pre mint votes', preMintVotes.toString())

    const txMint = await tokenContract.mint(toAddress, ethers.utils.parseEther(Number(mintValue).toFixed(18)))
    console.log('awaiting confirmations mint')
    await txMint.wait()
    console.log('mint transaction hash', txMint.hash)

    const postMintVotes = await tokenContract.getVotes(toAddress)
    console.log('post mint votes', postMintVotes.toString())

}
main().catch(error => {
    console.log('main error', error)
    process.exit(1)
})