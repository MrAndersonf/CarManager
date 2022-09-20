import React from 'react';
import { EOrder } from '../Enums';

import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Snack from '../Components/Snack';

export function toDollar(price: string) {
  const value = Number(price.replace(',', '.'));
  const dollar = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'USD',
  });
  return dollar;
}

export const getFromFirebase = (collection: string) => {};

export const all = async <T>() => {
  const response = await axios.get(`http://api-test.bhut.com.br:3000/api/cars`);
  if (response.status === 200) {
    return response.data;
  }
};

export const create = async <T>(item: T) => {
  const response = await axios.post(
    'http://api-test.bhut.com.br:3000/api/cars',
    item,
    {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
    },
  );
  if (response.status === 200) {
    return response.data;
  }
};

export const find = async <T>(id: string) => {
  const response = await axios.get(
    `http://api-test.bhut.com.br:3000/api/cars/${id}`,
  );
  if (response.status === 200) {
    return response.data;
  }
};

export const update = async <T>(id: string, item: T) => {
  const response = await axios.put(
    `http://api-test.bhut.com.br:3000/api/cars/${id}`,
    item,
  );
  if (response.status === 200) {
    return response.data;
  }
};

export const deleteOne = async (id: string) => {
  await axios.delete(`http://api-test.bhut.com.br:3000/api/cars/${id}`);
};

export const monetaryValue = (
  event: React.KeyboardEvent<HTMLDivElement>,
  amount: number,
  handle: (value: number) => void,
) => {
  event.preventDefault();

  const { code, key } = event;
  if (Number(key) >= 0 || Number(code) <= 9) {
    let value = sanitize(amount.toFixed(2));
    const p = value + key;
    let numeric = Number(p) / 100;
    handle(numeric);
  }
  if (code === 'Backspace') {
    let value = sanitize(amount.toString());
    let numeric = Number(value.slice(0, -1));
    handle(numeric);
  }
};

export const sanitize = (raw: string) => {
  return raw.replace(/[^a-zA-Z0-9 ]/g, '').replace(',', '');
};

export const removeLetter = (raw: string) => {
  return raw.replace(/[^0-9.]+/g, '');
};

export const formatter = (money: number, currency: string) => {
  if (currency === 'Real') {
    return money.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      style: 'currency',
      currency: 'BRL',
    });
  } else {
    return money.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      style: 'currency',
      currency: 'USD',
    });
  }
};

export const thousand = (number: number) => {
  return number.toLocaleString();
};

export function dateTimeFormatter(date: Date) {
  const day = date.toLocaleDateString('pt-BR');
  const time = date.toLocaleTimeString('pt-BR');
  return `${day} ${time}`;
}

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (orderBy === 'price') {
    if (Number(b[orderBy]) < Number(a[orderBy])) {
      return -1;
    }
    if (Number(b[orderBy]) > Number(a[orderBy])) {
      return 1;
    }
    return 0;
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
export function getComparator<Key extends keyof any>(
  order: EOrder,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function generateId() {
  return uuidv4();
}

export function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number,
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}
export function defaultLabelDisplayedRows({ from, to, count }: any) {
  return `${from}–${to} de ${count !== -1 ? count : `more than ${to}`}`;
}

export const now = () => {
  return new Date().getTime();
};

export const getGreater = <T>(list: T[], key: keyof T) => {
  if (list.length > 0) {
    const greater = list?.reduce((prev, cur) =>
      Number(prev[key]) > Number(cur[key]) ? prev : cur,
    );
    return Number(greater[key]);
  }
  return 0;
};

export const getLesser = <T>(list: T[], key: keyof T) => {
  if (list.length > 0) {
    const greater = list?.reduce((prev, cur) =>
      Number(prev[key]) < Number(cur[key]) ? prev : cur,
    );
    return Number(greater[key]);
  }
  return 0;
};

export const getLIstOf = <T>(list: T[], key: keyof T) => {
  const register = new Set();
  if (list.length > 0) {
    list.forEach(e => {
      if (!register.has(e[key])) {
        register.add(e[key]);
      }
    });
  }
  return Array.from(register) as typeof key[];
};
