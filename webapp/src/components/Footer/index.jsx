import React from 'react';
import { CREATOR_INFO } from 'constant/main.constant';
import * as S from './Footer.style';

export default function Footer(props) {
  return (
    <S.Container>
      <S.InformationBox>
        <h2>코넥트 프로젝트</h2>
        {CREATOR_INFO.map(({ name, field, contact }) => (
          <li key={name}>
            <S.Name>{name}</S.Name>
            <span>{field}</span>
            <a href={contact} target="_blank" rel="noreferrer">
              {contact}
            </a>
          </li>
        ))}
      </S.InformationBox>
    </S.Container>
  );
}
