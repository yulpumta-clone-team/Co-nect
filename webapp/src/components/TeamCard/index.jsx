import React from 'react';
import PropTypes from 'prop-types';
import { teamType } from 'types/team.type';

import * as S from './style';

TeamCard.propTypes = {
  cardInfo: teamType.isRequired,
  onClick: PropTypes.func,
};

export default function TeamCard({ cardInfo, onClick }) {
  console.log('cardInfo', cardInfo);
  const { id, name, skills, session, img, read, likeCnt, commentCnt, user } = cardInfo;
  return (
    <S.CardWrapper onClick={onClick}>
      <h1>id: {id}</h1>
      <h2>좋아요: {likeCnt}</h2>
      <h2>{name}</h2>
      <div>{session}</div>
      <ul>
        {skills.map((skill, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={idx}>{skill}</li>
        ))}
      </ul>
    </S.CardWrapper>
  );
}
