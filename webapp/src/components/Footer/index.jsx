import React from 'react';
import { developers } from 'constant/main.constant';
import * as S from './Footer.style';

export default function Footer(props) {
  return (
    <S.Container>
      <S.InformationBox>
        <h2>코넥트 프로젝트</h2>
        {developers.map(({ name, field, contact }) => (
          <li key={name}>
            <S.Name>{name}</S.Name>
            <span>{field}</span>
            <span>{contact}</span>
          </li>
        ))}
      </S.InformationBox>
    </S.Container>
  );
}
