import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { userCardType } from 'types/user.type';
import heartIcon from 'assets/icons/heart.svg';
import checkIcon from 'assets/icons/check-button.svg';
import crossIcon from 'assets/icons/cross-button.svg';
import Button from 'components/Common/Button';

import * as S from './style';
import ButtonStories, { Secondary } from 'components/Common/Button/Button.stories';

UserCard.propTypes = {
  cardInfo: userCardType.isRequired,
  onClick: PropTypes.func,
};

export default function UserCard({ cardInfo, onClick }) {
  const { id, name, hopeSession, likeCnt, img, job, belong_team, skills } = cardInfo;
  const [teamBelong, setTeamBelong] = useState({ crossIcon });
  const team = (belong_team) => {
    belong_team ? setTeamBelong({ checkIcon }) : setTeamBelong({ crossIcon });
    return teamBelong;
  };
  return (
    <S.CardWrapper onClick={onClick}>
      <S.CardTop>
        <S.Image>
          <img src={heartIcon} alt="Heart" />
        </S.Image>
      </S.CardTop>
      <S.BackgroundImg>
        <S.Job>{job}</S.Job>
      </S.BackgroundImg>
      <S.UserInfo>
        <h2>{name}</h2>
        <div>현재 소속 여부 : {team}</div>
        <div>희망기간 : {hopeSession}</div>
        <h1>{id}</h1>
        <h2>좋아요: {likeCnt}</h2>
      </S.UserInfo>
      <img style={{ width: '30px' }} src={img} alt="profile" />
    </S.CardWrapper>
  );
}
