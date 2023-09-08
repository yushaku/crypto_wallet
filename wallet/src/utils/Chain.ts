import { FaEthereum } from "react-icons/fa";

export type Chain = {
  chainId: string;
  name: string;
  blockExplorerUrl: string;
  rpcUrl: string;
};

export const goerli: Chain = {
  chainId: "5",
  name: "Goerli",
  blockExplorerUrl: "https://goerli.etherscan.io",
  rpcUrl: "https://goerli.infura.io/v3/354872a8849140a48afe69abdea29f00",
};

export const sepolia: Chain = {
  chainId: "11155111",
  name: "Sepolia",
  blockExplorerUrl: "https://sepolia.etherscan.io/",
  rpcUrl: "https://sepolia.infura.io/v3/354872a8849140a48afe69abdea29f00",
};

export const mainnet: Chain = {
  chainId: "1",
  name: "Ethereum",
  blockExplorerUrl: "https://etherscan.io",
  rpcUrl: "https://mainnet.infura.io/v3/354872a8849140a48afe69abdea29f00",
};

export const CHAINS_CONFIG = {
  [goerli.chainId]: goerli,
  [mainnet.chainId]: mainnet,
  [sepolia.chainId]: sepolia,
};

export const CHAINS_LOGO = {
  [goerli.chainId]: FaEthereum,
  [mainnet.chainId]: FaEthereum,
  [sepolia.chainId]: FaEthereum,
};

export const chainList = [mainnet, goerli, sepolia];
