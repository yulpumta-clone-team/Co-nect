import React from 'react';
import PropTypes from 'prop-types';
import { userCardType } from 'types/user.type';
import ProfileImg from 'components/ProfileImg';
import { S3_IMAGE_SERVER_URL } from 'constant/api.constant';
import { userCardParser } from 'service/user.parser';
import TechSkills from 'components/TechSkills';
import * as S from './style';

UserCard.propTypes = {
  cardInfo: userCardType.isRequired,
  onClick: PropTypes.func,
};

export default function UserCard({ cardInfo, onClick }) {
  const parsedCardInfo = userCardParser(cardInfo);
  const { name, hopeSession, img, job, skills } = parsedCardInfo;
  const S3Img = S3_IMAGE_SERVER_URL + img;

  return (
    <S.CardWrapper onClick={onClick}>
      <S.CardTop>
        <S.Heart />
      </S.CardTop>
      <S.BackgroundImg>
        <S.UserJob>{job}</S.UserJob>
      </S.BackgroundImg>
      <ProfileImg src={S3Img} />
      <S.UserInfo>
        <S.UserName>{name}</S.UserName>
        <S.TeamBelongBoard>
          현재 소속 여부 <S.TeamBelong />
        </S.TeamBelongBoard>
        <S.HopeSession>
          희망 기간 &nbsp; <S.UserHopeSession>{hopeSession}</S.UserHopeSession>
        </S.HopeSession>
      </S.UserInfo>
      <S.Divider />
      <TechSkills skills={skills} isCarousel imageSize="48px" gap="10px" />
      <S.CountBoard>
        <S.Chat />
        000
        <S.View />
        000
      </S.CountBoard>
    </S.CardWrapper>
  );
}
