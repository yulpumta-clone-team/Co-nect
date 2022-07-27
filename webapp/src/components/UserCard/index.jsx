import React from 'react';
import PropTypes from 'prop-types';
import { userType } from 'types/user.type';

import * as S from './style';

UserCard.propTypes = {
  cardInfo: userType.isRequired,
  onClick: PropTypes.func,
};

export default function UserCard({ cardInfo, onClick }) {
  const { id, name, hopeSession, likeCnt, status } = cardInfo;
  return (
    <S.CardWrapper onClick={onClick}>
      <h1>{id}</h1>
      <h2>좋아요: {likeCnt}</h2>
      <h2>{name}</h2>
      <div>{hopeSession}</div>
    </S.CardWrapper>
  );
}
