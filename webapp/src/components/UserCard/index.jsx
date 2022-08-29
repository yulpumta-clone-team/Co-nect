import React from 'react';
import PropTypes from 'prop-types';
import { userCardType } from 'types/user.type';
import ProfileImg from 'components/ProfileImg';
import { S3_IMAGE_SERVER_URL } from 'constant/api.constant';
import { userCardParser } from 'service/user.parser';
import TechSkills from 'components/TechSkills';
import * as S from './UserCard.style';

UserCard.propTypes = {
  cardInfo: userCardType.isRequired,
  onClick: PropTypes.func,
};

export default function UserCard({ cardInfo, onClick }) {
  const parsedCardInfo = userCardParser(cardInfo);
  const { name, hopeSession, img, job, skills, commentCnt, likeCnt, status } = parsedCardInfo;
  const S3Img = S3_IMAGE_SERVER_URL + img;
  const BelongStatus = status ? <S.CheckCircle /> : <S.CloseNormal />;

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
          <span>현재 소속 여부</span>
          {BelongStatus}
        </S.TeamBelongBoard>
        <S.HopeSession>
          희망 기간 &nbsp; <S.UserHopeSession>{hopeSession}</S.UserHopeSession>
        </S.HopeSession>
      </S.UserInfo>
      <S.Divider />
      <TechSkills skills={skills} isCarousel imageSize="35px" gap="11px" />
      <S.CardInfoIndicator>
        <S.SingleIndicator>
          <S.Chat />
          {commentCnt}
        </S.SingleIndicator>
        <S.SingleIndicator>
          <S.View />
          {likeCnt}
        </S.SingleIndicator>
      </S.CardInfoIndicator>
    </S.CardWrapper>
  );
}
