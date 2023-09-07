import { goerli } from "@/utils/Chain";
import axios from "axios";

export class TransactionService {
  static API_URL = "https://deep-index.moralis.io/api/v2";
  static API_KEY =
    "EuwYtjWwWHGbnwsCnGauMtMMaEQZugtjaws2ybm2ZpSR15a8vzl6QUPkEUWHTOCU";

  static async getTransactions(address: string) {
    const options = {
      method: "GET",
      url: `${this.API_URL}/${address}`,
      params: { chain: goerli.name.toLowerCase() },
      headers: {
        accept: "application/json",
        "X-API-Key": this.API_KEY,
      },
    };

    const response = await axios.request(options);
    return response;
  }
}
