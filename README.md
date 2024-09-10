# Mind Raise Hardhat Project

This project contains a simple ERC721 contract for implementing a 3D Model NFT, it includes a test for that contract, and a the ability to deploy that contract.

The .env file contains the following

NETWORK_URL // A combination of your URL and PROJECTID
PRIVATE_KEY // Of your ethereum account
OWNER // Account address
RECIPIENT // Account address
BASE_URI // URL to your storage. The system expects there to be #.json files in there with # being the Token ID.

To run the test call the following:

```shell
npx hardhat test
```
