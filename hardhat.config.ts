import { HardhatUserConfig } from "hardhat/config";
import "hardhat-gas-reporter";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-solhint";
import "@openzeppelin/hardhat-upgrades";

import dotenv from "dotenv";

dotenv.config();
const { COIN_MARKETCAP_API_KEY = "", REPORT_GAS = false } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  typechain: {
    outDir: "./typechain",
  },
  gasReporter: {
    enabled: Boolean(REPORT_GAS),
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: COIN_MARKETCAP_API_KEY,
    currency: "USD",
    token: "ETH",
  },
};

export default config;
