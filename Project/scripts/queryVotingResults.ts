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

    const balance = Number(ethers.utils.formatEther(await signer.getBalance()));
    console.log(`Wallet balance ${balance}`);
    if (balance < 0.01) {
        throw new Error("Not enough ether");
    }

    if (process.argv.length < 3) throw new Error('Ballot Address is missing')
    const ballotAddress = process.argv[2]
    const ballotContract = new Contract(
        ballotAddress,
        ballotJson.abi,
        signer
    ) as CustomBallot

    const winningProposalIndex = await ballotContract.winningProposal()
    const winningProposal = await ballotContract.proposals(winningProposalIndex)
    const winnerName = await ballotContract.winnerName()
    console.log('winnig proposal index', winningProposalIndex.toString())
    console.log('winning proposal vote count', winningProposal.voteCount.toString())
    console.log('winner name', ethers.utils.parseBytes32String(winnerName))

}
main().catch(err => {
    console.log(err)
    process.exit(1)
})