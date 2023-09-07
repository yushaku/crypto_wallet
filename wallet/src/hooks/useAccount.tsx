import { Account } from "@/types/Account";
import { generateAccount } from "@/utils/AccountUtils";
import { RECOVERYKEY } from "@/utils/constants";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

const AccountContext = createContext<Account | null>(null);

export const useAccount = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<Account | null>(null);

  const recoverAccount = useCallback(async (recoveryPhrase: string) => {
    const result = generateAccount(recoveryPhrase);
    setAccount(result.account);

    if (localStorage.getItem(RECOVERYKEY) !== recoveryPhrase) {
      localStorage.setItem(RECOVERYKEY, recoveryPhrase);
    }
  }, []);

  useEffect(() => {
    const storedRecoveryPhrase = localStorage.getItem(RECOVERYKEY);
    if (storedRecoveryPhrase) {
      recoverAccount(storedRecoveryPhrase);
    }
  }, [recoverAccount]);

  return (
    <AccountContext.Provider value={account}>
      {children}
    </AccountContext.Provider>
  );
};
