const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  // Replace with your deployed contract address
  const contractAddress = `${process.env.OWNER}`;
  // Replace with the recipient address that will receive the minted token
  const recipientAddress = `${process.env.RECIPIENT}`;
  // Replace with the metadata URI for the token
  // Get the contract ABI
  const MindRaiseModels = await ethers.getContractFactory(
    "MindRaiseModelFactory"
  );
  // Connect to the deployed contract
  const mindRaiseModels = MindRaiseModels.attach(contractAddress);
  const nextTokenId = await mindRaiseModels.getNextTokenId();
  const tokenURI = `${process.env.BASE_URI}/${nextTokenId}.json`;

  // Mint the token
  const tx = await mindRaiseModels.safeMint(recipientAddress, tokenURI);

  // Wait for the transaction to be confirmed
  await tx.wait();

  console.log(
    `Token minted successfully to ${recipientAddress} with URI: ${tokenURI}`
  );
}
// Execute the main function
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
