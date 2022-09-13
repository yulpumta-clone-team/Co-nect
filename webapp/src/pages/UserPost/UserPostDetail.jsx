/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import CommentContainer from 'components/ComentContainer';
import { POST_TYPE } from 'constant';
import { userDetailParser } from 'service/user/user.parser';
import Image from 'components/Common/Image';
import Divider from 'components/Common/Divider';
import TechSkills from 'components/TechSkills';
import MarkdownEditor from 'components/MarkdownEditor';
import * as S from './UserPost.style';

export default function UserPostDetail({ targetUser }) {
  const parsedTargetUser = userDetailParser(targetUser);
  const {
    id,
    oauthId,
    email,
    name,
    portfolio,
    slogan,
    content,
    img,
    hopeSession,
    job,
    skills,
    status,
    commentCnt,
    likeCnt,
  } = parsedTargetUser;

  return (
    <S.PostContainer>
      <S.ProfileImageContainer>
        <Image src={img} alt="프로필 이미지" />
      </S.ProfileImageContainer>
      <S.InfoContainer>
        <S.UserInfoContainer>
          <S.SingleInfo>
            <S.SingleInfoTitle>닉네임</S.SingleInfoTitle>
            <div>
              <span>{name}</span>
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
              <span>{status ? '팀 있음' : '팀 없음'}</span>
            </div>
          </S.SingleInfo>
          <S.SingleInfo>
            <S.SingleInfoTitle>기술스택</S.SingleInfoTitle>
            <div>
              <TechSkills skills={skills} imageSize="30px" />
            </div>
          </S.SingleInfo>
          <S.SingleInfo>
            <S.SingleInfoTitle>자기소개</S.SingleInfoTitle>
            <MarkdownEditor onlyViewer content={content} />
          </S.SingleInfo>
        </S.UserInfoContainer>
        <Divider customStyle={S.CommentDivder} />
        <CommentContainer postType={POST_TYPE.USER} postWriter={name} postId={id} />
      </S.InfoContainer>
    </S.PostContainer>
  );
}
