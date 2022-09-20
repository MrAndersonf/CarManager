export interface IMaskedInputFunctions {
  plain: () => string;
  clear: () => void;
  error: (message: string, error: boolean) => void;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
  label: string;
}

export interface ICar {
  _id: string;
  title: string;
  brand: string;
  price: string;
  age: number;
}

export interface IUser {
  name: string;
  email: string;
  picture: string;
}
