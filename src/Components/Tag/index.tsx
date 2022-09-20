import React from 'react';
import { Main, Title } from './styles';

export interface ITag {
  title: string;
}

export const Tag = ({ title }: ITag) => {
  return (
    <Main>
      <Title>{title}</Title>
    </Main>
  );
};
