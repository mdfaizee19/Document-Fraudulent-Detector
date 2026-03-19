async function main() {
  const Anchor = await ethers.getContractFactory("Anchor");
  const anchor = await Anchor.deploy();

  await anchor.deployed();   // << correct for Hardhat v2

  console.log("Anchor deployed at:", anchor.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
