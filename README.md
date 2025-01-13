
# Ethereum Wallet Dashboard by Jelly de Ocampo

## 🚀 Overview

This project is a full-stack Ethereum wallet dashboard enabling users to:

- **Connect Wallet (MetaMask)**
- **View Balance & Transactions**
- **Mint Tokens (ERC-20)**
- **View Minted Tokens**

### 📦 Technologies Used

- **Frontend:** React + TypeScript + Ethers.js
- **Backend:** Node.js + Express + MongoDB + Redis
- **Smart Contract:** Solidity + Hardhat + OpenZeppelin
- **Blockchain:** Ethereum (Sepolia Testnet via Alchemy)

---

## ⚙️ Project Structure

```
eth-wallet-dashboard/
├── backend/          # Express API + MongoDB + Redis
├── frontend/         # React + Ethers.js
├── contracts/        # Solidity Smart Contract + Hardhat
├── docker-compose.yml
├── .env
└── README.md
```

---

## 🛠️ Prerequisites

- **Node.js** >= 16.x
- **npm** or **yarn**
- **Docker & Docker Compose** (for containerization)
- **MetaMask Wallet**
- **Alchemy API Key** ([https://alchemy.com](https://alchemy.com))

---

## 🛠️ Setup & Running Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-repo/eth-wallet-dashboard.git
cd eth-wallet-dashboard
```

### 2️⃣ Install Dependencies

```bash
# Install all dependencies for frontend, backend, and contracts
cd frontend && npm install
cd ../backend && npm install
cd ../contracts && npm install
```

### 3️⃣ Configure `.env`

```env
PORT=5000
ALCHEMY_API_KEY=your_alchemy_api_key
PRIVATE_KEY=your_private_key
MONGODB_URI=mongodb://localhost:27017/eth-dashboard
REDIS_URL=redis://localhost:6379
CONTRACT_ADDRESS=your_deployed_contract_address
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### 4️⃣ Deploy Smart Contract

```bash
cd contracts
npx hardhat run scripts/deploy.js --network sepolia
```

Copy the deployed contract address to `.env` → `CONTRACT_ADDRESS`.

### 5️⃣ Start Backend Server

```bash
cd backend
npm run start
```

### 6️⃣ Start Frontend

```bash
cd frontend
npm run start
```

Access the app at `http://localhost:3000`.

---

## 🐋 **Docker Setup** (Bonus)

### 1️⃣ Build & Start Docker Containers

```bash
docker-compose up --build
```

### 2️⃣ Access the App

- **Frontend:** `http://localhost:3000`
- **Backend API:** `http://localhost:5000`

---

## 📝 Assumptions & Decisions

- **Sepolia Testnet** is used for cheaper and faster transactions.
- **Redis Caching** minimizes API calls for gas prices and block numbers.
- **MongoDB** tracks user balances for analytical purposes.

---

## ⚠️ Known Issues

- **Insufficient Funds Error:** Ensure your wallet has Sepolia ETH.
- **Rate Limits:** Etherscan and Alchemy have rate limits on free plans.
- **No Transaction Data:** Fresh wallets won't show transactions.

---

## 📬 Contact

For questions or feedback, feel free to open an issue or contact **Jelly de Ocampo**.

---

## ✨ Acknowledgements

- [OpenZeppelin](https://openzeppelin.com/)
- [Hardhat](https://hardhat.org/)
- [Alchemy](https://alchemy.com/)
- [Ethers.js](https://docs.ethers.io/)

