import React, { useState, useEffect } from 'react';
import { BrowserProvider, formatEther } from 'ethers';
import './App.css';
import { ETHERSCAN_API_KEY } from './config';
import MintToken from './components/MintToken';
import { mintToken } from './services/api';

type Transaction = {
  hash: string;
  from: string;
  to: string;
  value: string;
};

const App: React.FC = () => {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [address, setAddress] = useState<string>('');
  const [balance, setBalance] = useState<string>('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [mintStatus, setMintStatus] = useState<string>('');

  const connectWallet = async (): Promise<void> => {
    if ((window as any).ethereum) {
      try {
        setLoading(true);
        const ethProvider = new BrowserProvider((window as any).ethereum);
        const signer = await ethProvider.getSigner();
        const userAddress = await signer.getAddress();
        const userBalance = await ethProvider.getBalance(userAddress);

        setProvider(ethProvider);
        setAddress(userAddress);
        setBalance(formatEther(userBalance));
        fetchTransactions(userAddress);
        setLoading(false);
      } catch (err) {
        console.error('Error connecting wallet:', err);
        setError('Failed to connect wallet.');
        setLoading(false);
      }
    } else {
      setError('MetaMask not detected. Install MetaMask to continue.');
    }
  };

  const fetchTransactions = async (userAddress: string): Promise<void> => {
    try {
      const response = await fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${userAddress}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`);
      const data = await response.json();
      if (data.status === '1' && data.result.length > 0) {
        setTransactions(data.result.slice(0, 10));
      } else {
        setTransactions([]);
        setError('No transactions found for this address.');
      }
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Error fetching transaction history.');
    }
  };

  const handleMintToken = async () => {
    try {
      setMintStatus('Minting token...');
      const response = await mintToken(address);
      setMintStatus(`Token minted! Transaction Hash: ${response.txHash}`);
      fetchTransactions(address); // Refresh transactions
    } catch (err) {
      setMintStatus('Minting failed. Please try again.');
    }
  };

  return (
    <div className="container advanced-bg">
      <header className="header gradient-bg">
        <h1>🌐 Ethereum Wallet Dashboard</h1>
        <button className="btn neon-btn" onClick={connectWallet} disabled={loading}>
          {loading ? '🔄 Connecting...' : '🔗 Connect Wallet'}
        </button>
      </header>

      {error && <div className="error">⚠️ {error}</div>}

      {address && (
        <div className="content fade-in">
          <div className="card glassmorphism hover-card">
            <h2>📄 Account Details</h2>
            <p><strong>🔑 Address:</strong> {address}</p>
            <p><strong>💰 Balance:</strong> {balance} ETH</p>
          </div>

          <MintToken onMint={handleMintToken} mintStatus={mintStatus} />

          <div className="card glassmorphism hover-card">
            <h2>📜 Last 10 Transactions</h2>
            {transactions.length > 0 ? (
              <ul className="transaction-list">
                {transactions.map((tx) => (
                  <li key={tx.hash} className="transaction-item">
                    <p><strong>📝 Hash:</strong> {tx.hash}</p>
                    <p><strong>📤 From:</strong> {tx.from}</p>
                    <p><strong>📥 To:</strong> {tx.to}</p>
                    <p><strong>💸 Value:</strong> {formatEther(tx.value)} ETH</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No transactions available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
