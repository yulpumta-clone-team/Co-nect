/* eslint-disable react/prop-types */
import React from 'react';
import CommentContainer from 'components/ComentContainer';
import MarkdownEditor from 'components/MarkdownEditor';
import { POST_TYPE } from 'constant';
import Divider from 'components/Common/Divider';
import { teamDetailParser } from 'service/team/team.parser';
import TechSkills from 'components/TechSkills';
import Image from 'components/Common/Image';
import LikeApi from 'components/Common/Like';
import ChatBubbleOvalSvg from 'assets/icons/ChatBubbleOvalSvg';
import EyeSvg from 'assets/icons/EyeSvg';
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
        <Image src={teamImage} alt="게시글" customStyle={S.ViewingImage} />
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
          <S.View>
            <EyeSvg />
            000
          </S.View>
          <LikeApi id={teamId} />
          {likeCnt}
          <S.Chat>
            <ChatBubbleOvalSvg />
            {commentCnt}
          </S.Chat>
        </S.SingleInfo>
        <CommentContainer postType={POST_TYPE.TEAM} postWriterId={writerInfo.id} postId={teamId} />
      </S.TeamInfoContainer>
    </S.PostContainer>
  );
}
