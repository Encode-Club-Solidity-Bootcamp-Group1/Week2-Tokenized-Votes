import deploy from "./deployments";

async function main() {
  const ballotAddress = await deploy("Allen", "russ", "Kuro", "IKA");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
