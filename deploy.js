const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const MindRaiseModels = await ethers.getContractFactory(
    "MindRaiseModelFactory"
  );
  const initialOwner = `${process.env.OWNER}`; // Replace with the actual initial owner address
  // Set a lower gas price (example: 5 gwei)

  const mindRaiseModels = await MindRaiseModels.deploy(initialOwner);
  console.log("MindRaiseModelFactory deployed to:", mindRaiseModels.address);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
