/* eslint-disable react/prop-types */
import React from 'react';
import CommentContainer from 'components/ComentContainer';
import MarkdownEditor from 'components/MarkdownEditor';
import { POST_TYPE } from 'constant';
import Divider from 'components/Common/Divider';
import { teamDetailParser } from 'service/team.parser';
import TechSkills from 'components/TechSkills';
import Image from 'components/Common/Image';
import Slogan from 'pages/EssentialInfo/SubPages/Slogan';
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
  const { id, name, user, content, img, hopeSession, skills, slogan, commentCnt, likeCnt } =
    parsedTargetTeam;

  // const { id, name, content, session, img, read, skills, commentCnt, likeCnt, user } = targetTeam;
  return (
    <S.PostContainer>
      <S.ImgContainer>
        {img ? <S.ViewingImage src={img} alt="게시글" /> : <S.EmptyImage />}
      </S.ImgContainer>
      <S.TeamInfoContainer>
        <S.UserName>
          <Image src={img} alt="프로필 이미지" customStyle={S.UserImg} />
          {user.name}
        </S.UserName>
        <S.SingleInfo>
          <S.SingleInfoTitle customStyle={S.TeamName}>{name}</S.SingleInfoTitle>
        </S.SingleInfo>
        <Divider />
        <S.Skill>
          <S.SingleInfoTitle customStyle={S.TeamSkillSession}>기술 스택</S.SingleInfoTitle>
          <TechSkills skills={skills} imageSize="40px" />
        </S.Skill>
        <S.HopeSession>
          <S.SingleInfoTitle customStyle={S.TeamSkillSession}> 희망 작업 기간</S.SingleInfoTitle>
          <div>
            <span>{hopeSession}</span>
          </div>
        </S.HopeSession>

        <Divider />
        <S.SingleInfo>
          <S.SingleInfoTitle customStyle={S.Slogan}>{slogan}</S.SingleInfoTitle>
        </S.SingleInfo>
        <S.SingleInfo>
          <MarkdownEditor onlyViewer content={content} />
        </S.SingleInfo>
        <Divider customStyle={S.CommentDivider} />
        <S.SingleInfo>
          <div>
            <S.View />
          </div>
          <S.Heart />
          {likeCnt}
          <S.Chat />
          {commentCnt}
        </S.SingleInfo>
        <CommentContainer postType={POST_TYPE.TEAM} postWriter={user.name} postId={id} />
      </S.TeamInfoContainer>
    </S.PostContainer>
  );
}
