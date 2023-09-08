import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { ethers } from "ethers";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AccountContext } from "../hooks/AccountProvider";
import { toFixedIfNecessary } from "../utils/AccountUtils";

export const SendToken = () => {
  const { account, chain } = useContext(AccountContext);
  const [value, setValue] = useState({
    balance: "0",
    amount: 0,
    asset: "",
    to: "",
  });

  useEffect(() => {
    if (!account) return;

    const fetchData = async () => {
      const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);
      try {
        const accountBalance = await provider.getBalance(account?.address);
        setValue({
          ...value,
          balance: String(
            toFixedIfNecessary(ethers.utils.formatEther(accountBalance))
          ),
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as "to" | "asset" | "amount";

    if (name === "amount") {
      console.log(typeof e.target.value !== "number");
      if (typeof e.target.value !== "number") return;

      setValue({
        ...value,
        [name]: Number.parseFloat(e.target.value),
      });
    } else {
      setValue({
        ...value,
        [name]: e.target.value,
      });
    }
  };

  return (
    <article className="p-5 m-3 shadow bg-gray-100/50 min-h-[80dvh] ">
      <Card color="transparent" shadow={false} className="mx-auto w-fit">
        <Typography variant="h4" className="text-blue-500">
          Send tokens
        </Typography>

        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Send from"
              onChange={handleOnchange}
              value={account?.address}
              crossOrigin=""
            />
            <Input
              size="lg"
              name="to"
              value={value.to}
              label="Send to"
              onChange={handleOnchange}
              crossOrigin=""
            />
            <Input
              size="lg"
              name="asset"
              label="Asset"
              value={value.asset}
              onChange={handleOnchange}
              crossOrigin=""
            />
            <Input
              size="lg"
              name="amount"
              label="Amount"
              value={value.amount}
              onChange={handleOnchange}
              crossOrigin=""
            />
          </div>

          <Button className="mt-6" fullWidth>
            Send
          </Button>
        </form>
      </Card>
    </article>
  );
};
