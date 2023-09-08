import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import { ChangeEvent, useContext, useState } from "react";
import { AccountContext } from "../../hooks/AccountProvider";
import { LocalAccount } from "../../types/Account";
import { KEY_LIST } from "../../utils/constants";

export const ImportAccountDialog = ({
  open,
  handleOpen,
}: {
  open: boolean;
  handleOpen: () => void;
}) => {
  const { handleAddAccount } = useContext(AccountContext);

  const [value, setValue] = useState<LocalAccount>({
    privateKey: "",
    title: "",
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

    const check = keyList?.some((key) => key.privateKey === value.privateKey);
    if (!check) {
      keyList?.unshift(value);
      localStorage.setItem(KEY_LIST, JSON.stringify(keyList));
      handleAddAccount(value);
    }
    handleOpen();
  };

  return (
    <Dialog open={open} handler={handleOpen}>
      <div className="flex items-center justify-between">
        <DialogHeader>Import your account</DialogHeader>
      </div>

      <DialogBody divider>
        <div className="grid gap-6">
          <Input
            label="Private key"
            name="privateKey"
            value={value.privateKey}
            onChange={handleOnchange}
            crossOrigin=""
          />
          <Input
            label="Account name"
            name="title"
            onChange={handleOnchange}
            value={value.title}
            crossOrigin=""
          />
        </div>
      </DialogBody>

      <DialogFooter className="space-x-2">
        <Button variant="outlined" color="red" onClick={handleOpen}>
          close
        </Button>
        <Button variant="gradient" color="green" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
