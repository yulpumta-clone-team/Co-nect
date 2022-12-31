import React from 'react';
import PropTypes from 'prop-types';
import { teamCardType } from 'types/team.type';
import ProfileImg from 'components/Common/ProfileImg';
import { teamCardParser } from 'service/team/team.parser';
import TechSkills from 'components/TechSkills';
import HeartSvg from 'assets/icons/HeartSvg';
import ChatBubbleOvalSvg from 'assets/icons/ChatBubbleOvalSvg';
import EyeSvg from 'assets/icons/EyeSvg';
import * as S from './TeamCard.style';

TeamCard.propTypes = {
  cardInfo: teamCardType.isRequired,
  onClick: PropTypes.func,
};

export default function TeamCard({ cardInfo, onClick }) {
  const parsedTeamCardInfo = teamCardParser(cardInfo);
  // * : teamCard 에 표시되는 정보

  const {
    teamName,
    teamImage,
    hopeSession,
    skills,
    commentCnt,
    readCnt,
    isRecruitng,
    writer,
    slogan,
  } = parsedTeamCardInfo;

  const RecruitStatus = isRecruitng ? '모집중' : '모집완료';
  return (
    <S.CardWrapper onClick={onClick}>
      <S.CardTop>
        <S.Heart>
          <HeartSvg />
        </S.Heart>
      </S.CardTop>
      <S.BackgroundImg>
        <S.TeamStatus isRecruitng={isRecruitng}>{RecruitStatus}</S.TeamStatus>
      </S.BackgroundImg>
      <ProfileImg src={teamImage} alt={`${teamName}의 프로필 이미지`} customStyle={S.ProfileImg} />
      <S.TeamInfo>
        <S.UserName>{writer.name}님의 모집</S.UserName>
        <S.TeamName>{teamName}</S.TeamName>
        <S.TeamSlogan>{slogan}</S.TeamSlogan>
        <S.HopeSession>
          <span>예상 기간</span>
          <S.TeamHopeSession>{hopeSession}</S.TeamHopeSession>
        </S.HopeSession>
      </S.TeamInfo>
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
          {readCnt}
        </S.SingleIndicator>
      </S.CardInfoIndicator>
    </S.CardWrapper>
  );
}
