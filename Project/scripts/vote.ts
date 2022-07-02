import { Contract, ethers } from "ethers";
import * as ballotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import "dotenv/config";
import { CustomBallot } from "../typechain";

const EXPOSED_KEY = ""
async function main() {
    const provider = ethers.providers.getDefaultProvider("ropsten")
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY2 ?? EXPOSED_KEY).connect(provider)

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
    console.log("ballot Contract", ballotContract.address)
    const votingPower = await ballotContract.votingPower()
    console.log('voting power', votingPower.toString())
    // const spentPower = await ballotContract.spentVotePower(signer.address)
    // console.log('spent power', spentPower.toString())

    // const proposals = await ballotContract.proposals(0)
    // console.log('proposals', ethers.utils.parseBytes32String(proposals.name), proposals.voteCount.toString())

    // const txVote = await ballotContract.vote(1, ethers.utils.parseEther("1"))
    // console.log("Awaiting confirmations ...")

    // await txVote.wait()

    // console.log("txVote Hash", txVote.hash)
}

main().catch(eror => {
    console.log(eror)
    process.exit(1)
})
