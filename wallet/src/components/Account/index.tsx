import { AccountContext } from "../../hooks/AccountProvider";
import { PublicAccount } from "../../types/Account";
import { useContext, useState } from "react";
import { ImportAccountDialog } from "../dialog/ImportAccount";
import { Avatar, Button } from "@material-tailwind/react";
import { CreateAccountDialog } from "../dialog/CreateAccount";

export const Accounts = () => {
  const { accountList } = useContext(AccountContext);
  const [open, setOpen] = useState({
    importDialog: false,
    createDialog: false,
  });

  return (
    <article className="p-5 m-3 shadow bg-gray-100/50">
      <h2 className="text-2xl font-medium text-blue-500">Accounts</h2>

      <hr className="my-4" />

      <div>
        <h4 className="text-xl text-blue-400">Primary crypto accounts</h4>
        <p className="text-gray-600">
          You can create primary accounts in Brave Wallet that may be backed up
          or restored from your recovery phrase. To learn more about account
          types visit account help.
        </p>
      </div>

      <ul className="mt-5 max-h-96 overflow-y-scroll">
        {accountList?.map((acc: PublicAccount) => {
          return (
            <li key={acc.address} className="flex items-center gap-3 mt-3">
              <Avatar src="/logo192.png" alt="avatar" size="xs" />
              <p>
                <p className="font-medium">{acc.title}</p>
                <p className="text-gray-500">{acc.address}</p>
              </p>
            </li>
          );
        })}
      </ul>

      <Button
        onClick={() =>
          setOpen({
            ...open,
            createDialog: !open.createDialog,
          })
        }
        className="btn border mt-4 rounded-md"
      >
        Create Account
      </Button>

      <hr className="my-4" />

      <div>
        <h4 className="text-xl text-blue-400">Imported accounts</h4>
        <p className="text-gray-600">
          These accounts can be used with Web3 DApps, and can be shown in your
          portfolio. However, note that secondary accounts cannot be restored
          via recovery phrase from your primary account backup.
        </p>

        <Button
          onClick={() =>
            setOpen({
              ...open,
              importDialog: !open.importDialog,
            })
          }
          className="btn border rounded-md"
          variant="gradient"
        >
          Import
        </Button>
        <button className="btn border rounded-md">
          Import from hardware wallet
        </button>
      </div>

      <ImportAccountDialog
        open={open.importDialog}
        handleOpen={() =>
          setOpen({
            ...open,
            importDialog: !open.importDialog,
          })
        }
      />

      <CreateAccountDialog
        open={open.createDialog}
        handleOpen={() =>
          setOpen({
            ...open,
            createDialog: !open.createDialog,
          })
        }
      />
    </article>
  );
};
