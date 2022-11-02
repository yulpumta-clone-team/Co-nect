import React from 'react';
import CommentContainer from 'components/ComentContainer';
import { POST_TYPE } from 'constant';
import { userDetailParser } from 'service/user/user.parser';
import Image from 'components/Common/Image';
import Divider from 'components/Common/Divider';
import TechSkills from 'components/TechSkills';
import MarkdownEditor from 'components/MarkdownEditor';
import { userDetailType } from 'types/user.type';
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
        <Image src={profileImage} alt="프로필 이미지" />
      </S.ProfileImageContainer>
      <S.InfoContainer>
        <S.UserInfoContainer>
          <S.SingleInfo>
            <S.SingleInfoTitle>닉네임</S.SingleInfoTitle>
            <div>
              <span>{nickname}</span>
            </div>
          </S.SingleInfo>
          <S.SingleInfo>
            <S.SingleInfoTitle>포트폴리오</S.SingleInfoTitle>
            <div>
              <S.PortfolioLink href={portfolio}>{portfolio}</S.PortfolioLink>
            </div>
          </S.SingleInfo>
          <S.SingleInfo>
            <S.SingleInfoTitle>슬로건</S.SingleInfoTitle>
            <div>
              <span>{slogan}</span>
            </div>
          </S.SingleInfo>
          <S.SingleInfo>
            <S.SingleInfoTitle>희망 작업 기간</S.SingleInfoTitle>
            <div>
              <span>{hopeSession}</span>
            </div>
          </S.SingleInfo>
          <S.SingleInfo>
            <S.SingleInfoTitle>직업</S.SingleInfoTitle>
            <div>
              <span>{job}</span>
            </div>
          </S.SingleInfo>
          <S.SingleInfo>
            <S.SingleInfoTitle>현재 상태</S.SingleInfoTitle>
            <div>
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
        <S.PostInfo>{likeCnt}</S.PostInfo>
        <CommentContainer postType={POST_TYPE.USER} postWriterId={userId} postId={userId} />
      </S.InfoContainer>
    </S.PostContainer>
  );
}
