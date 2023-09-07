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

export const axiosClient = httpClient();

export const getTansactions = async (
  address: string,
  chainName = "ethereum"
) => {
  const res = await httpClient().get(address, {
    params: chainName,
  });
  return res.data;
};
