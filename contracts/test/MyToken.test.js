const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", function () {
  let MyToken, myToken, owner, addr1;

  beforeEach(async function () {
    MyToken = await ethers.getContractFactory("MyToken");
    [owner, addr1] = await ethers.getSigners();
    myToken = await MyToken.deploy();
    await myToken.deployed();
  });

  it("Should mint tokens to the owner", async function () {
    await myToken.mint(owner.address, 1000);

    // Convert BigNumber to string for comparison
    const ownerBalance = await myToken.balanceOf(owner.address);
    expect(ownerBalance.toString()).to.equal("1000");
  });

  it("Should transfer tokens between accounts", async function () {
    await myToken.mint(owner.address, 1000);
    await myToken.transfer(addr1.address, 500);

    // Convert BigNumber to string for comparison
    const addr1Balance = await myToken.balanceOf(addr1.address);
    expect(addr1Balance.toString()).to.equal("500");
  });
});
