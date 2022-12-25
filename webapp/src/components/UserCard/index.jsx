import React from 'react';
import PropTypes from 'prop-types';
import { userCardType } from 'types/user.type';
import ProfileImg from 'components/ProfileImg';
import { S3_IMAGE_SERVER_URL } from 'constant/api.constant';
import { userCardParser } from 'service/user/user.parser';
import TechSkills from 'components/TechSkills';
import HeartSvg from 'assets/icons/HeartSvg';
import EyeSvg from 'assets/icons/EyeSvg';
import ChatBubbleOvalSvg from 'assets/icons/ChatBubbleOvalSvg';
import CheckCircleSvg from 'assets/icons/CheckCircleSvg';
import XMarkSvg from 'assets/icons/XMarkSvg';
import * as S from './UserCard.style';

UserCard.propTypes = {
  cardInfo: userCardType.isRequired,
  onClick: PropTypes.func,
};

export default function UserCard({ cardInfo, onClick }) {
  const parsedCardInfo = userCardParser(cardInfo);
  const { name, hopeSession, img, job, skills, commentCnt, likeCnt, status } = parsedCardInfo;
  const S3Img = S3_IMAGE_SERVER_URL + img;

  return (
    <S.CardWrapper onClick={onClick}>
      <S.CardTop>
        <S.Heart>
          <HeartSvg />
        </S.Heart>
      </S.CardTop>
      <S.BackgroundImg>
        <S.UserJob>{job}</S.UserJob>
      </S.BackgroundImg>
      <ProfileImg src={S3Img} alt={`${name}의 프로필 이미지`} customStyle={S.ProfileImg} />
      <S.UserInfo>
        <S.UserName>{name}</S.UserName>
        <S.TeamBelongBoard>
          <span>현재 소속 여부</span>
          <S.BelongStatus>{status ? <CheckCircleSvg /> : <XMarkSvg />}</S.BelongStatus>
        </S.TeamBelongBoard>
        <S.HopeSession>
          희망 기간 &nbsp; <S.UserHopeSession>{hopeSession}</S.UserHopeSession>
        </S.HopeSession>
      </S.UserInfo>
      <S.Divider />
      <TechSkills
        skills={skills}
        isCarousel
        imageSize="50px"
        gap="10px"
        customStyle={S.TechSkills}
      />
      <S.CardInfoIndicator>
        <S.SingleIndicator>
          <ChatBubbleOvalSvg />
          {commentCnt}
        </S.SingleIndicator>
        <S.SingleIndicator>
          <EyeSvg />
          {likeCnt}
        </S.SingleIndicator>
      </S.CardInfoIndicator>
    </S.CardWrapper>
  );
}
