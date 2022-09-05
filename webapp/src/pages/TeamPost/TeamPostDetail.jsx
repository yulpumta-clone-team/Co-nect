/* eslint-disable react/prop-types */
import React from 'react';
import CommentContainer from 'components/ComentContainer';
import MarkdownEditor from 'components/MarkdownEditor';
import { POST_TYPE } from 'constant';
import Divider from 'components/Common/Divider';
import { teamDetailParser } from 'service/team.parser';
import TechSkills from 'components/TechSkills';
import * as S from './TeamPost.style';

const javascriptUrl =
  'https://user-images.githubusercontent.com/71386219/186051220-a77fa08e-b501-4baa-af3c-47ae602d25e1.png';
export const skillsImg = [
  { id: 0, imageUrl: javascriptUrl, label: 'javascript' },
  { id: 1, imageUrl: javascriptUrl, label: 'javascript' },
  { id: 2, imageUrl: javascriptUrl, label: 'javascript' },
  { id: 3, imageUrl: javascriptUrl, label: 'javascript' },
  { id: 4, imageUrl: javascriptUrl, label: 'javascript' },
  { id: 5, imageUrl: javascriptUrl, label: 'javascript' },
  { id: 6, imageUrl: javascriptUrl, label: 'javascript' },
  { id: 7, imageUrl: javascriptUrl, label: 'javascript' },
  { id: 8, imageUrl: javascriptUrl, label: 'javascript' },
];

export default function TeamPostDetail({ targetTeam }) {
  const parsedTargetTeam = teamDetailParser(targetTeam);
  const { id, name, user, content, img, hopeSession, skills, commentCnt, likeCnt } =
    parsedTargetTeam;

  // const { id, name, content, session, img, read, skills, commentCnt, likeCnt, user } = targetTeam;
  return (
    <S.PostContainer>
      <S.ImgContainer>
        <S.ViewingImage src={img} alt="게시글" />
      </S.ImgContainer>
      <S.TeamInfoContainer>
        <S.SingleInfo>
          <S.SingleInfoTitle>사용자 명</S.SingleInfoTitle>
          <div>
            <span>{user.name}</span>
          </div>
        </S.SingleInfo>
        <S.SingleInfo>
          <S.SingleInfoTitle>팀 이름</S.SingleInfoTitle>
          <div>
            <span>{name}</span>
          </div>
        </S.SingleInfo>
        <S.SingleInfo>
          <S.SingleInfoTitle>기술 스택</S.SingleInfoTitle>
          <div>
            <TechSkills skills={skills} imageSize="30px" />
          </div>
        </S.SingleInfo>
        <S.SingleInfo>
          <S.SingleInfoTitle> 희망 작업 기간</S.SingleInfoTitle>
          <div>
            <span>{hopeSession}</span>
          </div>
        </S.SingleInfo>
        <S.SingleInfo>
          <S.SingleInfoTitle>자기소개</S.SingleInfoTitle>
          <MarkdownEditor onlyViewer content={content} />
        </S.SingleInfo>
        <Divider customStyle={S.CommentDivider} />
        <CommentContainer postType={POST_TYPE.TEAM} postWriter={user.name} postId={id} />
      </S.TeamInfoContainer>
    </S.PostContainer>
  );
}
