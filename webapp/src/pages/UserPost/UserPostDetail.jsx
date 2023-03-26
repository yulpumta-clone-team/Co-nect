import React from 'react';
import CommentContainer from 'components/ComentContainer';
import { DOMAIN_TYPE } from 'constant';
import { userDetailParser } from 'service/user/user.parser';
import Divider from 'components/Common/Divider';
import TechSkills from 'components/TechSkills';
import MarkdownEditor from 'components/MarkdownEditor';
import { userDetailType } from 'types/user.type';
import ProfileImg from 'components/Common/ProfileImg';
import TeamBelongCheckInput from 'components/TeamBelongCheckInput';
import PostInfo from 'components/PostInfo';
import * as S from './UserPost.style';

UserPostDetail.propTypes = {
  targetUser: userDetailType,
};

export default function UserPostDetail({ targetUser }) {
  const parsedTargetUser = userDetailParser(targetUser);
  const {
    belongTeam,
    commentCnt,
    email,
    hopeSession,
    introduction,
    job,
    likeCnt,
    nickname,
    userId,
    portfolio,
    profileImage,
    readCnt,
    techSkills,
    slogan,
  } = parsedTargetUser;

  return (
    <S.PostContainer>
      <S.ProfileImageContainer>
        <ProfileImg src={profileImage} alt="프로필 이미지" />
        <S.UserName>{nickname}</S.UserName>
        <S.UserJob>{job}</S.UserJob>
      </S.ProfileImageContainer>
      <S.InfoContainer>
        <S.UserInfoContainer>
          <S.Slogan>{slogan}</S.Slogan>
          <S.SingleInfo>
            <S.SingleInfoTitle>포트폴리오</S.SingleInfoTitle>
            <div>
              <S.PortfolioLink href={portfolio}>{portfolio}</S.PortfolioLink>
            </div>
          </S.SingleInfo>
          <S.SingleInfo>
            <S.SingleInfoTitle>희망 작업 기간</S.SingleInfoTitle>
            <div>
              <span>{hopeSession}</span>
            </div>
          </S.SingleInfo>
          <S.SingleInfo>
            <S.SingleInfoTitle>현재 상태</S.SingleInfoTitle>
            <div>
              <TeamBelongCheckInput value={belongTeam} onlyDisplay />
              <span>{belongTeam}</span>
            </div>
          </S.SingleInfo>
          <S.SingleInfo>
            <S.SingleInfoTitle>기술스택</S.SingleInfoTitle>
            <div>
              <TechSkills skills={techSkills} imageSize="30px" />
            </div>
          </S.SingleInfo>
          <S.SingleInfo>
            <S.SingleInfoTitle>자기소개</S.SingleInfoTitle>
            <MarkdownEditor onlyViewer content={introduction} />
          </S.SingleInfo>
        </S.UserInfoContainer>
        <Divider customStyle={S.CommentDivder} />
        <PostInfo postId={userId} readCnt={readCnt} likeCnt={likeCnt} commentCnt={commentCnt} />
        <CommentContainer postType={DOMAIN_TYPE.USER} postWriterId={userId} postId={userId} />
      </S.InfoContainer>
    </S.PostContainer>
  );
}
