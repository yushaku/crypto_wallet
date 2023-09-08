import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { LocalAccount, PublicAccount } from "../types/Account";
import { parseKey } from "../utils/AccountUtils";
import { Chain, CHAINS_CONFIG, mainnet } from "../utils/Chain";
import { CURRENT_CHAIN, KEY_LIST } from "../utils/constants";

type Props = {
  account: PublicAccount | null;
  accountList: PublicAccount[] | null;
  setAccount: Dispatch<React.SetStateAction<PublicAccount | null>>;
  chain: Chain;
  handlechageChain: (c: Chain) => void;
  handleAddAccount: (value: LocalAccount) => void;
};

export const AccountContext = createContext<Props>({} as Props);

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [accountList, setAccountList] = useState<PublicAccount[]>([]);
  const [account, setAccount] = useState<PublicAccount | null>(null);
  const [chain, setChain] = useState<Chain>(CHAINS_CONFIG[mainnet.chainId]);

  const handleAddAccount = (value: LocalAccount) => {
    const address = parseKey(value.privateKey);
    setAccountList([
      ...accountList,
      {
        title: value.title,
        address,
      },
    ]);
  };

  const handlechageChain = (c: Chain) => {
    if (c === chain) return;
    localStorage.setItem(CURRENT_CHAIN, JSON.stringify(c));
    setChain(c);
  };

  useEffect(() => {
    const data = localStorage.getItem(KEY_LIST) ?? "[]";
    const chain = localStorage.getItem(CURRENT_CHAIN) ?? "{}";

    const keyList: Array<LocalAccount> | null = JSON.parse(data);
    const chainInfo: Chain | null = JSON.parse(chain);

    const result = keyList?.map(({ privateKey, title }) => ({
      title,
      address: parseKey(privateKey),
    }));

    if (result) {
      setAccountList(result);
      setAccount(result[0]);
    }

    if (chainInfo) {
      setChain(chainInfo);
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      account: account,
      accountList: accountList,
      setAccount,
      chain,
      handleAddAccount,
      handlechageChain,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [account, accountList]
  );

  return (
    <AccountContext.Provider value={contextValue}>
      {children}
    </AccountContext.Provider>
  );
};
