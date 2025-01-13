import { ethers, isAddress, formatUnits, formatEther, parseUnits } from 'ethers';
import dotenv from 'dotenv';
import { redisClient } from '../server';
import BalanceModel from '../models/Balance';
import MyToken from '../../contracts/artifacts/contracts/MyToken.sol/MyToken.json';

dotenv.config();

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY!;
const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
const contractAddress = process.env.CONTRACT_ADDRESS!;
const contract = new ethers.Contract(contractAddress, MyToken.abi, wallet);

// Fetch account details
export const getAccountDetails = async (address: string) => {
  if (!isAddress(address)) {
    return { error: 'Invalid Ethereum address' };
  }

  try {
    const cachedGasPrice = await redisClient.get('gasPrice');
    const cachedBlockNumber = await redisClient.get('blockNumber');

    let gasPrice, blockNumber;

    if (cachedGasPrice && cachedBlockNumber) {
      gasPrice = cachedGasPrice;
      blockNumber = parseInt(cachedBlockNumber);
    } else {
      const feeData = await provider.getFeeData();
      gasPrice = feeData.gasPrice ? formatUnits(feeData.gasPrice, 'gwei') : 'Unavailable';
      blockNumber = await provider.getBlockNumber();

      await redisClient.setEx('gasPrice', 60, gasPrice);
      await redisClient.setEx('blockNumber', 60, blockNumber.toString());
    }

    const balance = await provider.getBalance(address);
    const formattedBalance = formatEther(balance);

    await BalanceModel.findOneAndUpdate(
      { address },
      { balance: formattedBalance, blockNumber, gasPrice },
      { upsert: true, new: true }
    );

    return { address, balance: formattedBalance, blockNumber, gasPrice };
  } catch (error) {
    console.error('Error fetching account details:', error);
    return { error: `Failed to fetch account details: ${(error as Error).message}` };
  }
};

// Mint token
export const mintToken = async (to: string) => {
  try {
    const tx = await contract.mint(to, parseUnits('100', 18));
    await tx.wait();
    return tx.hash;
  } catch (error) {
    console.error('Minting Error:', error);
    throw new Error(`Minting failed: ${(error as Error).message}`);
  }
};
