import { Contract, ethers } from "ethers";
import * as ballotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import "dotenv/config";
import { CustomBallot } from "../typechain";

const EXPOSED_KEY = ""
async function main() {
    const provider = ethers.providers.getDefaultProvider("ropsten")
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY1 ?? EXPOSED_KEY).connect(provider)

    const balance = Number(ethers.utils.parseEther((await signer.getBalance()).toString()))
    if (balance < 0.01) {
        throw new Error("Low Balance")
    }

    if (process.argv.length < 3) {
        throw new Error("Ballot Address is missing")
    }
    if (process.argv.length < 4) {
        throw new Error("Proposal is missing")
    }
    if (process.argv.length < 5) {
        throw new Error("Number of votes is missing")
    }

    const [, , ballotAddress, proposal, numberOfVotes] = process.argv

    const ballotContract = new Contract(ballotAddress, ballotJson.abi, signer) as CustomBallot
    console.log('signer address', signer.address)
    console.log("ballot Contract", ballotContract.address)

    const txVote = await ballotContract.vote(proposal, ethers.utils.parseEther(numberOfVotes))
    console.log("Awaiting confirmations ...")

    await txVote.wait()

    console.log("txVote Hash", txVote.hash)
}

main().catch(eror => {
    console.log(eror)
    process.exit(1)
})
