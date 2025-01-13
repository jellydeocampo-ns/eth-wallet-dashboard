import React from 'react';

interface MintTokenProps {
  onMint: () => void;
  mintStatus: string;
}

const MintToken: React.FC<MintTokenProps> = ({ onMint, mintStatus }) => {
  return (
    <div className="card glassmorphism hover-card">
      <h2>🪙 Mint New Token</h2>
      <button className="btn neon-btn" onClick={onMint}>Mint Token</button>
      {mintStatus && <p>{mintStatus}</p>}
    </div>
  );
};

export default MintToken;
