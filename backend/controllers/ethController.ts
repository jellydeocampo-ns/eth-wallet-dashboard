import { Request, Response } from 'express';
import { mintToken, getAccountDetails } from '../services/ethService';

export const mintTokenController = async (req: Request, res: Response) => {
  const { address } = req.body;

  try {
    const txHash = await mintToken(address);
    res.status(200).json({ message: 'Token minted successfully', txHash });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getAccountController = async (req: Request, res: Response) => {
  const { address } = req.params;

  try {
    const accountData = await getAccountDetails(address);
    res.status(200).json(accountData);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
