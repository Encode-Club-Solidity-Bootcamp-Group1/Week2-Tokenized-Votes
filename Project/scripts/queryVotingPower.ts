import "dotenv/config";
import { Contract, ethers } from "ethers"
import * as ballotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import { CustomBallot } from "../typechain";
const EXPOSED_KEY =
  "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";
async function main() {
    const provider = ethers.providers.getDefaultProvider('ropsten')
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY ?? EXPOSED_KEY)
        .connect(provider)
    if (process.argv.length < 3) throw new Error('Ballot Address is missing')
    const ballotAddress = process.argv[2]
    const ballotContract = new Contract(
        ballotAddress,
        ballotJson.abi,
        signer
    ) as CustomBallot
    const votingPower = await ballotContract.votingPower()
    console.log('voting power', votingPower.toString())

}
main().catch(err => {
    console.log(err)
    process.exit(1)
})