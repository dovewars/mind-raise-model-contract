const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const MindRaiseModelFactory = await ethers.getContractFactory(
    "MindRaiseModelFactory"
  );
  const initialOwner = `${process.env.OWNER}`;

  const mindRaiseModelFactory = await MindRaiseModelFactory.deploy(
    initialOwner
  );

  console.log(
    "MindRaiseModelFactory deployed to:",
    mindRaiseModelFactory.target
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
