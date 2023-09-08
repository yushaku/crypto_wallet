import { getBalance, getTokenPrice, TokenPrice } from "../services/axiosClient";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "./AccountProvider";

type Props = {
  balance: string;
  tokenPrice: TokenPrice;
};
export const useGetToken = () => {
  const { account, chain } = useContext(AccountContext);

  const [data, setData] = useState<Props>({} as Props);

  const handleGetToken = async () => {
    if (!account) return;

    const [res, tokenPrice] = await Promise.all([
      getBalance(account?.address ?? "", `0x${chain.chainId}`),
      getTokenPrice(
        "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        `0x${chain.chainId}`
      ),
    ]);

    setData({
      balance: res.balance,
      tokenPrice,
    });
  };

  useEffect(() => {
    handleGetToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chain]);

  return data;
};
