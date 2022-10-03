/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import CommentContainer from 'components/ComentContainer';
import MarkdownEditor from 'components/MarkdownEditor';
import { POST_TYPE } from 'constant';
import Divider from 'components/Common/Divider';
import { teamDetailParser } from 'service/team/team.parser';
import TechSkills from 'components/TechSkills';
import Image from 'components/Common/Image';
import Slogan from 'pages/EssentialInfo/SubPages/Slogan';
import useAxios from 'hooks/useAxios';
import teamApi from 'api/team.api';
import LikeApi from 'components/Common/Like/LikeApi';
import * as S from './TeamPost.style';

export default function TeamPostDetail({ targetTeam }) {
  const parsedTargetTeam = teamDetailParser(targetTeam);

  const {
    teamId,
    teamName,
    writerInfo,
    teamImage,
    content,
    hopeSession,
    techSkills,
    slogan,
    commentCnt,
    likeCnt,
  } = parsedTargetTeam;
  return (
    <S.PostContainer>
      <S.ImgContainer>
        {teamImage ? (
          <Image src={teamImage} alt="게시글" customStyle={S.ViewingImage} />
        ) : (
          <S.EmptyImage />
        )}
      </S.ImgContainer>
      <S.TeamInfoContainer>
        <S.UserName>
          <Image src={teamImage} alt="프로필 이미지" customStyle={S.UserImg} />
          {writerInfo.name}
        </S.UserName>
        <S.SingleInfo>
          <S.TeamName>{teamName}</S.TeamName>
        </S.SingleInfo>
        <Divider />
        <S.Skill>
          <S.TeamSkillSession>기술 스택</S.TeamSkillSession>
          <TechSkills skills={techSkills} imageSize="40px" />
        </S.Skill>
        <S.HopeSession>
          <S.TeamSkillSession> 희망 작업 기간</S.TeamSkillSession>
          <div>
            <span>{hopeSession}</span>
          </div>
        </S.HopeSession>

        <Divider />
        <S.SingleInfo>
          <S.Slogan>{slogan}</S.Slogan>
        </S.SingleInfo>
        <S.SingleInfo>
          <MarkdownEditor onlyViewer content={content} />
        </S.SingleInfo>
        <Divider customStyle={S.CommentDivider} />
        <S.SingleInfo>
          <div>
            <S.View />
          </div>
          <LikeApi id={teamId} isUser="false" />
          {likeCnt}
          <S.Chat />
          {commentCnt}
        </S.SingleInfo>
        <CommentContainer postType={POST_TYPE.TEAM} postWriter={writerInfo.name} postId={teamId} />
      </S.TeamInfoContainer>
    </S.PostContainer>
  );
}
