async function main() {
  const ProofChainNFT = await ethers.getContractFactory("ProofChainNFT");

  const nft = await ProofChainNFT.deploy();

  await nft.waitForDeployment();

  console.log("Contrato deployado em:");
  console.log(await nft.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});