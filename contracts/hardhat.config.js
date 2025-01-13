// ======================
// hardhat.config.js
// ======================

require("@nomiclabs/hardhat-ethers");
require('dotenv').config({ path: '../.env' });


module.exports = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};
