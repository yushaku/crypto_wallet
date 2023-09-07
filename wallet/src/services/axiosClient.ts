import axios from "axios";

const API_KEY =
  "EuwYtjWwWHGbnwsCnGauMtMMaEQZugtjaws2ybm2ZpSR15a8vzl6QUPkEUWHTOCU";

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
  return res.data;
};
