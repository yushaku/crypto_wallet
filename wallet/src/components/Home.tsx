import {
  Avatar,
  Input,
  Option,
  Select,
  Tab,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { TfiClipboard } from "react-icons/tfi";
import { AccountContext } from "../hooks/AccountProvider";
import { useGetToken } from "../hooks/useGetToken";
import { TokenPrice } from "../services/axiosClient";
import { shortenAddress } from "../utils/AccountUtils";
import { chainList, CHAINS_LOGO } from "../utils/Chain";

const data = [
  {
    label: "Tokens",
    value: "tokens",
  },
  {
    label: "NFTs",
    value: "NFTs",
  },
  {
    label: "Transaction",
    value: "Transaction",
  },
];

export const Home = () => {
  const { accountList, account, setAccount, chain, handlechageChain } =
    useContext(AccountContext);

  const { balance, tokenPrice } = useGetToken();

  return (
    <article className="p-5 m-3 shadow bg-gray-100/50 ">
      <div>
        <h2 className="text-2xl font-medium mb-4 text-blue-500">Portfolio</h2>
        <div className="flex justify-between">
          <p className="text-3xl text-blue-300">${balance}</p>

          <p className="flex justify-center w-fit text-blue-500 px-3 py-2 bg-blue-300/20 rounded-full">
            {shortenAddress(account?.address ?? "", 6)}
            <TfiClipboard
              className="ml-2 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(account?.address ?? "");
                toast.success("copyed");
              }}
            />
          </p>
        </div>
      </div>

      <br className="my-3" />

      <Tabs value="html" className="min-h-[65dvh] pt-2">
        <div className="flex justify-between">
          <TabsHeader>
            {data.map(({ label, value }) => (
              <Tab key={value} value={value}>
                {label}
              </Tab>
            ))}
          </TabsHeader>

          <div className="flex gap-3">
            <Select label="Select Account" value={account?.title}>
              {accountList?.map((acc) => {
                return (
                  <Option key={acc.address} onClick={() => setAccount(acc)}>
                    <p>{acc.title}</p>
                  </Option>
                );
              })}
            </Select>

            <Select label="Select Chain" value={chain.name}>
              {chainList.map((ch) => {
                const Icon = CHAINS_LOGO[ch.chainId];
                return (
                  <Option key={ch.chainId} onClick={() => handlechageChain(ch)}>
                    <p className="flex gap-2">
                      <Icon
                        color="white"
                        className="border-[3px] border-blue-400 w-5 h-5 bg-blue-400 rounded-full"
                      />
                      {ch.name}
                    </p>
                  </Option>
                );
              })}
            </Select>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex mb-8 justify-between items-center gap-12">
            <p>Tokens</p>
            <Input label="Search" crossOrigin="" />
          </div>

          <TabsBody>
            <article className="flex items-center max-w-[800px]">
              <div className="flex items-center w-1/3">Assets</div>
              <div className="w-1/3 text-center">Assets Price</div>
              <div className="w-1/3 text-center">Balance</div>
            </article>

            <hr className="my-6" />

            <TokenItem tk={tokenPrice} balance={Number(balance)} />
          </TabsBody>
        </div>
      </Tabs>
    </article>
  );
};

const TokenItem = ({ tk, balance }: { tk: TokenPrice; balance: number }) => {
  return (
    <article className="flex items-center max-w-[800px]">
      <div className="flex items-center w-1/3">
        <Avatar src={tk?.tokenLogo} />
        <Typography>{tk?.tokenName}</Typography>
      </div>

      <div className="w-1/3 text-center">${tk?.usdPrice.toFixed(2)}</div>

      <div className="w-1/3 text-center">
        <p>${tk?.usdPrice * balance}</p>
        <p className="text-blue-400 font-medium">
          {balance}
          <span className="ml-3">{tk?.tokenSymbol}</span>
        </p>
      </div>
    </article>
  );
};
