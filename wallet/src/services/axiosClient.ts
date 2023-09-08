import axios from "axios";

const API_KEY =
  "Eg0NEVzsnchJKNDfZaoqRjmVubCk6ujSCqoksiEEUmgGFjNZiSPBHfbMmvdzVJQ6";

export const httpClient = () => {
  const client = axios.create({
    baseURL: "https://deep-index.moralis.io/api/v2",
    headers: {
      Accept: "*",
      "Content-Type": "application/json",
      "X-API-Key": API_KEY,
    },
  });

  return client;
};

export const getTansactions = async (
  account: string,
  chainName = "ethereum"
) => {
  const res = await httpClient().get(account, {
    params: chainName,
  });
  return res.data;
};

export const getTokenPrice = async (tokenAdd: string, networkId: string) => {
  const res = await httpClient().get(
    "/erc20/" + tokenAdd + "/price?chain=" + networkId
  );
  return res.data as TokenPrice;
};

export const getBalance = async (address: string, networkId: string) => {
  const res = await httpClient().get(`/${address}/balance?chain=${networkId}`);
  return res.data as { balance: string };
};

export interface TokenPrice {
  tokenName: string;
  tokenSymbol: string;
  tokenLogo: string;
  tokenDecimals: string;
  nativePrice: NativePrice;
  usdPrice: number;
  usdPriceFormatted: string;
  exchangeAddress: string;
  exchangeName: string;
  tokenAddress: string;
}

interface NativePrice {
  value: string;
  decimals: number;
  name: string;
  symbol: string;
  address: string;
}
