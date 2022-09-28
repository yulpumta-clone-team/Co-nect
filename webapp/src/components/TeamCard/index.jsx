import React from 'react';
import PropTypes from 'prop-types';
import { teamCardType } from 'types/team.type';
import { S3_IMAGE_SERVER_URL } from 'constant/api.constant';
import ProfileImg from 'components/ProfileImg';
import { teamCardParser } from 'service/team/team.parser';
import TechSkills from 'components/TechSkills';
import * as S from './TeamCard.style';

TeamCard.propTypes = {
  cardInfo: teamCardType.isRequired,
  onClick: PropTypes.func,
};

export default function TeamCard({ cardInfo, onClick }) {
  const parsedTeamCardInfo = teamCardParser(cardInfo);
  // * : teamCard 에 표시되는 정보

  const { teamName, teamImage, hopeSession, skills, commentCnt, readCnt, isRecruitng, writer } =
    parsedTeamCardInfo;

  const S3Img = S3_IMAGE_SERVER_URL + teamImage;
  const RecruitStatus = isRecruitng ? '모집중' : '모집완료';
  return (
    <S.CardWrapper onClick={onClick}>
      <S.CardTop>
        <S.Heart alt="좋아요 아이콘" />
      </S.CardTop>
      <S.BackgroundImg>
        <S.TeamStatus isRecruitng={isRecruitng}>{RecruitStatus}</S.TeamStatus>
      </S.BackgroundImg>
      <ProfileImg src={S3Img} />
      <S.TeamInfo>
        <S.UserName>{writer.name}님의 모집</S.UserName>
        <S.TeamName>{teamName}</S.TeamName>
        <S.HopeSession>
          예상 기간 &nbsp; <S.TeamHopeSession>{hopeSession}</S.TeamHopeSession>
        </S.HopeSession>
      </S.TeamInfo>
      <S.Divider />
      <TechSkills skills={skills} isCarousel imageSize="35px" gap="11px" />
      <S.CardInfoIndicator>
        <S.SingleIndicator>
          <S.Chat />
          {commentCnt}
        </S.SingleIndicator>
        <S.SingleIndicator>
          <S.View />
          {readCnt}
        </S.SingleIndicator>
      </S.CardInfoIndicator>
    </S.CardWrapper>
  );
}
