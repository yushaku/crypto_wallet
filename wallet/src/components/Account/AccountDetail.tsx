import React, { useEffect, useState } from "react";
import { TfiClipboard } from "react-icons/tfi";

import { sendToken } from "../../utils/TransactionUtils";
import AccountTransactions from "./AccountTransactions";
import { ethers } from "ethers";
import { shortenAddress, toFixedIfNecessary } from "../../utils/AccountUtils";
import "./Account.css";
import { Account } from "../../types/Account";
import { goerli } from "../../utils/Chain";

interface AccountDetailProps {
  account: Account;
}

const AccountDetail: React.FC<AccountDetailProps> = ({ account }) => {
  const [destinationAddress, setDestinationAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(account.balance);

  const [networkResponse, setNetworkResponse] = useState<{
    status: null | "pending" | "complete" | "error";
    message: string | React.ReactElement;
  }>({
    status: null,
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const provider = new ethers.providers.JsonRpcProvider(goerli.rpcUrl);
      let accountBalance = await provider.getBalance(account.address);
      setBalance(
        String(toFixedIfNecessary(ethers.utils.formatEther(accountBalance)))
      );
    };
    fetchData();
  }, [account.address]);

  function handleDestinationAddressChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setDestinationAddress(event.target.value);
  }

  function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAmount(Number.parseFloat(event.target.value));
  }

  async function transfer() {
    setNetworkResponse({
      status: "pending",
      message: "",
    });

    try {
      const { receipt } = await sendToken(
        amount,
        account.address,
        destinationAddress,
        account.privateKey
      );

      if (receipt.status === 1) {
        setNetworkResponse({
          status: "complete",
          message: (
            <p>
              Transfer complete!{" "}
              <a
                href={`${goerli.blockExplorerUrl}/tx/${receipt.transactionHash}`}
                target="_blank"
                rel="noreferrer"
              >
                View transaction
              </a>
            </p>
          ),
        });
        return receipt;
      } else {
        console.log(`Failed to send ${receipt}`);
        setNetworkResponse({
          status: "error",
          message: JSON.stringify(receipt),
        });
        return { receipt };
      }
    } catch (error: any) {
      console.error({ error });
      setNetworkResponse({
        status: "error",
        message: error.reason || JSON.stringify(error),
      });
    }
  }

  return (
    <div className="container">
      <h4 className="mb-9">
        <p className="mx-auto flex justify-center w-fit text-blue-500 px-3 py-2 bg-blue-300/20 rounded-full">
          {shortenAddress(account.address, 6)}
          <TfiClipboard className="ml-2" />
        </p>
        <p className="text-2xl mt-3">{balance} ETH</p>
      </h4>

      <div className="text-start">
        <label htmlFor="destinationAddress">Destination Address:</label>
        <input
          className="form-control"
          id="destinationAddress"
          type="text"
          value={destinationAddress}
          onChange={handleDestinationAddressChange}
        />
      </div>

      <div className="form-group">
        <label>Amount:</label>
        <input
          className="form-control"
          type="number"
          value={amount}
          onChange={handleAmountChange}
        />
      </div>

      <button
        className="bg-blue-400 text-white py-2 px-3 rounded-md"
        type="button"
        onClick={transfer}
        disabled={!amount || networkResponse.status === "pending"}
      >
        Send {amount} ETH
      </button>

      {networkResponse.status && (
        <>
          {networkResponse.status === "pending" && (
            <p>Transfer is pending...</p>
          )}
          {networkResponse.status === "complete" && (
            <p>{networkResponse.message}</p>
          )}
          {networkResponse.status === "error" && (
            <p>
              Error occurred while transferring tokens:{" "}
              {networkResponse.message}
            </p>
          )}
        </>
      )}

      <AccountTransactions account={account} />
    </div>
  );
};

export default AccountDetail;
