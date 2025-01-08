# Contract Address Checker

This project is a React-based web application that allows users to validate Ethereum smart contract addresses and simulate transactions. It utilizes the Etherscan API to fetch contract details and current gas prices, providing users with essential information about their transactions.

## Features

- **Contract Address Validation**: Enter a contract address to check its validity and retrieve contract details.
- **Transaction Simulation**: Simulate transactions by entering the recipient address, value, gas limit, and gas price.
- **Gas Price Tracker**: Automatically fetches and displays current gas prices from Etherscan.

## Tech Stack

- **React**: Frontend library for building user interfaces.
- **Ethers.js**: Library for interacting with the Ethereum blockchain.
- **Axios**: Promise-based HTTP client for making requests.
- **Tailwind CSS**: Utility-first CSS framework for styling.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- An Etherscan API key (create one at [Etherscan](https://etherscan.io/myapikey)).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.comthe-sandf/TransactionSimulator-Contrac-Checker.git
   cd contract-address-checker
   ```

2. Install the dependencies:

  ```bash
  npm install
  ```
Start the development server:

  ```bash
  npm run dev
  ```
Open your browser and go to http://localhost:3000.

### Configuration
- Before using the app, you need to provide your Etherscan API key:

- 1. Navigate to the login page.
- 2.Enter your Etherscan API key and click "Login".

### Usage
- 1. Check Contract Address:

- Input a valid Ethereum contract address in the "Enter contract address" field and click "Check" to see its details.

- 2. Simulate Transaction:

- Fill out the transaction form with the recipient address, value (in ETH), optional data, gas limit, and gas price.
- Click "Simulate Transaction" to see the estimated gas fees and recommendations.

### Contribution
 - Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

### License
- This project is licensed under the MIT License. See the LICENSE file for details.

### Acknowledgements
- Etherscan API for providing the API used in this project.
- Ethers.js for the Ethereum blockchain interaction.
- React for building the user interface.
-Tailwind CSS for styling the application.
