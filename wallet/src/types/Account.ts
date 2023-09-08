export interface Account {
  privateKey: string;
  address: string;
  balance: string;
}

export type LocalAccount = {
  title: string;
  privateKey: string;
};

export type PublicAccount = Omit<LocalAccount, "privateKey"> & {
  address: string;
};
