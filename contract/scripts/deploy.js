async function main() {
  // We get the contract to deploy
  const Locker = await ethers.getContractFactory("LockEth");
  const locker = await Locker.deploy();

  console.log("Locker deployed to:", locker.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1); 
  });