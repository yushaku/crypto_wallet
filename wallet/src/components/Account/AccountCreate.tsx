import React, { useCallback, useEffect, useState } from "react";
import { Account } from "../../types/Account";
import { generateAccount } from "../../utils/AccountUtils";
import { RECOVERYKEY } from "../../utils/constants";
import AccountDetail from "./AccountDetail";

function AccountCreate() {
  const [seedphrase, setSeedphrase] = useState("");
  const [showRecoverInput, setShowRecoverInput] = useState(false);
  const [account, setAccount] = useState<Account | null>(null);

  const recoverAccount = useCallback(async (recoveryPhrase: string) => {
    const result = generateAccount(recoveryPhrase);
    setAccount(result.account);

    if (localStorage.getItem(RECOVERYKEY) !== recoveryPhrase) {
      localStorage.setItem(RECOVERYKEY, recoveryPhrase);
    }
  }, []);

  useEffect(() => {
    const localStorageRecoveryPhrase = localStorage.getItem(RECOVERYKEY);
    if (localStorageRecoveryPhrase) {
      setSeedphrase(localStorageRecoveryPhrase);
      recoverAccount(localStorageRecoveryPhrase);
    }
  }, [recoverAccount]);

  async function createAccount() {
    const result = generateAccount();
    setAccount(result.account);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSeedphrase(event.target.value);
  }

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      recoverAccount(seedphrase);
    }
  };

  return (
    <div className="p-5 m-3 shadow bg-gray-100/50">
      {account ? (
        <AccountDetail account={account} />
      ) : (
        <form onSubmit={(event) => event.preventDefault()}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={createAccount}
          >
            Create Account
          </button>
          <button
            type="button"
            className="btn btn-outline-primary ml-3"
            onClick={() =>
              showRecoverInput
                ? recoverAccount(seedphrase)
                : setShowRecoverInput(true)
            }
            disabled={showRecoverInput && !seedphrase}
          >
            Recover account
          </button>
          {showRecoverInput && (
            <div className="form-group mt-3">
              <input
                type="text"
                placeholder="Seedphrase or private key for recovery"
                className="form-control"
                value={seedphrase}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </div>
          )}
        </form>
      )}
    </div>
  );
}
export default AccountCreate;
