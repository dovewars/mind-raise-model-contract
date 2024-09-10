const { expect } = require("chai");
const { ethers } = require("hardhat");
describe("MindRaiseModels", function () {
  let MindRaiseModels, mindRaiseModels, owner, addr1, addr2;
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    MindRaiseModels = await ethers.getContractFactory("MindRaiseModels");
    [owner, addr1, addr2] = await ethers.getSigners();
    // Deploy the contract
    mindRaiseModels = await MindRaiseModels.deploy(owner.address);
  });
  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await mindRaiseModels.owner()).to.equal(owner.address);
    });
  });
  describe("Minting", function () {
    it("Should mint a token and assign it to the recipient", async function () {
      const tokenURI = "https://example.com/metadata/1";
      // Mint a new token to addr1
      await mindRaiseModels.safeMint(addr1.address, tokenURI);
      const nextTokenId = await mindRaiseModels.getNextTokenId();
      // Convert to number if within safe range or use BigInt arithmetic
      expect(await mindRaiseModels.ownerOf(nextTokenId - 1n)).to.equal(
        addr1.address
      );
      // Check the token URI
      expect(await mindRaiseModels.tokenURI(nextTokenId - 1n)).to.equal(
        tokenURI
      );
    });
    it("Should fail if minting is attempted by a non-owner", async function () {
      const tokenURI = "https://example.com/metadata/2";
      await expect(
        mindRaiseModels.connect(addr1).safeMint(addr2.address, tokenURI)
      ).to.be.reverted;
    });
    it("Should increase the next token ID after minting", async function () {
      const initialNextTokenId = await mindRaiseModels.getNextTokenId();
      await mindRaiseModels.safeMint(
        addr1.address,
        "https://example.com/metadata/1"
      );
      const newNextTokenId = await mindRaiseModels.getNextTokenId();
      expect(newNextTokenId).to.equal(initialNextTokenId + 1n);
    });
  });
  describe("Pausable", function () {
    it("Should pause and unpause the contract", async function () {
      await mindRaiseModels.pause();
      await expect(
        mindRaiseModels.safeMint(
          addr1.address,
          "https://example.com/metadata/3"
        )
      ).to.be.reverted;
      await mindRaiseModels.unpause();
      await expect(
        mindRaiseModels.safeMint(
          addr1.address,
          "https://example.com/metadata/3"
        )
      ).not.to.be.reverted;
    });
  });
  describe("Token URI Management", function () {
    it("Should return the correct token URI after minting", async function () {
      const tokenURI = "https://example.com/metadata/4";
      await mindRaiseModels.safeMint(addr1.address, tokenURI);
      const nextTokenId = await mindRaiseModels.getNextTokenId();
      expect(await mindRaiseModels.tokenURI(nextTokenId - 1n)).to.equal(
        tokenURI
      );
    });
    it("Should allow the base URI to be an empty string", async function () {
      const tokenURI = "metadata/5.json";
      await mindRaiseModels.safeMint(addr1.address, tokenURI);
      const nextTokenId = await mindRaiseModels.getNextTokenId();
      expect(await mindRaiseModels.tokenURI(nextTokenId - 1n)).to.equal(
        tokenURI
      );
    });
  });
  describe("Supporting Interface", function () {
    it("Should support the required interfaces", async function () {
      expect(await mindRaiseModels.supportsInterface("0x80ac58cd")).to.be.true; // ERC721
      expect(await mindRaiseModels.supportsInterface("0x780e9d63")).to.be.true; // ERC721Enumerable
      expect(await mindRaiseModels.supportsInterface("0x5b5e139f")).to.be.true; // ERC721Metadata
    });
  });
});
