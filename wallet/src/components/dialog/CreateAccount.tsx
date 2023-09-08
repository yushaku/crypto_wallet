import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { ChangeEvent, useContext, useState } from "react";
import { AccountContext } from "../../hooks/AccountProvider";
import { LocalAccount } from "../../types/Account";
import { createAccount } from "../../utils/AccountUtils";
import { KEY_LIST } from "../../utils/constants";

export const CreateAccountDialog = ({
  open,
  handleOpen,
}: {
  open: boolean;
  handleOpen: () => void;
}) => {
  const { handleAddAccount } = useContext(AccountContext);

  const [value, setValue] = useState({
    title: "",
    mnemonic: "",
  });

  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as "key" | "name";

    setValue({
      ...value,
      [name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const data = localStorage.getItem(KEY_LIST) ?? "[]";
    const keyList: Array<LocalAccount> | null = JSON.parse(data);

    const acc = createAccount();
    console.log(acc);

    setValue({
      ...value,
      mnemonic: acc.mnemonic.phrase,
    });

    keyList?.unshift({
      title: value.title,
      privateKey: acc.privateKey,
    });

    localStorage.setItem(KEY_LIST, JSON.stringify(keyList));
    handleAddAccount({
      title: value.title,
      privateKey: acc.privateKey,
    });
  };

  const handleQuit = () => {
    setValue({
      mnemonic: "",
      title: "",
    });
    handleOpen();
  };

  return (
    <Dialog open={open} handler={handleOpen}>
      <div className="flex items-center justify-between">
        <DialogHeader>Create your account</DialogHeader>
      </div>

      <DialogBody divider>
        <div className="grid gap-6">
          {value.mnemonic ? (
            <>
              <Typography className="text-green-500 font-medium text-lg">
                Created succesfully
              </Typography>
              <Typography className="font-normal">
                Please store this mnemonic in a save place!
              </Typography>
              <Typography className="font-normal text-orange-300 border p-2 rounded-md">
                {value.mnemonic}
              </Typography>
            </>
          ) : (
            <Input
              label="Account name"
              name="title"
              onChange={handleOnchange}
              value={value.title}
              crossOrigin=""
            />
          )}
        </div>
      </DialogBody>

      <DialogFooter className="space-x-2">
        <Button variant="outlined" color="red" onClick={handleQuit}>
          close
        </Button>
        <Button variant="gradient" color="green" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
