
👋 Welcome! This is a simple demo for locking ethers to a smart contract.

### 1. Install Dependencies

_🛠 This project requires `NodeJS v14.x` or above._ See: [Node installation instructions](https://nodejs.org/en/) <br/>
_🛠 This project requires `web3 v1.5.2` or above._ 

### 2. Clone the project

### 3. Install dependencies

cd ./Contract
npm install
cd ../my-app
npm install

### 4. Deploy the contract

**** Replace 0xXXXXX of hardhat.config.js to the private key of the account you are going to deploy with.

cd ./Contract
npx hardhat run scripts/deploy.js --network rinkeby

Copy the deployed address to my-app/.env/REACT_APP_LOCKETH_CONTRACT_ADDRESS

### 5. Run the project

cd my-app
npm run start

🚀 Happy Hacking!
