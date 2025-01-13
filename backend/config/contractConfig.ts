import MyTokenABI from '../abis/MyToken.json';

export const CONTRACT_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';
export const CONTRACT_ABI = MyTokenABI.abi;

// ---------------------------

// backend/services/ethService.ts (Updated)
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contractConfig';
import dotenv from 'dotenv';

dotenv.config();

const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

export const mintToken = async (toAddress: string, amount: number) => {
  const tx = await contract.mint(toAddress, ethers.utils.parseUnits(amount.toString(), 18));
  await tx.wait();
  return tx.hash;
};