async function main() {
  const Box = await ethers.getContractFactory("Box");
  console.log("Deploying Box...");
  const box = await upgrades.deployProxy(Box, [42], { initializer: 'store' });
  await box.waitForDeployment(); // make sure it’s mined

  const address = await box.getAddress(); // <-- ethers v6
  console.log("Box deployed to:", address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });