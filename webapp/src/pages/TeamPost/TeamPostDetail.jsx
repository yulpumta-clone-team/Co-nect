import React from 'react';
import CommentContainer from 'components/ComentContainer';
import MarkdownEditor from 'components/MarkdownEditor';
import { DOMAIN_TYPE } from 'constant';
import Divider from 'components/Common/Divider';
import { teamDetailParser } from 'service/team/team.parser';
import TechSkills from 'components/TechSkills';
import Image from 'components/Common/Image';
import { teamDetailType } from 'types/team.type';
import PostInfo from 'components/PostInfo';
import * as S from './TeamPost.style';

TeamPostDetail.propTypes = {
  targetTeam: teamDetailType,
};

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
    readCnt,
  } = parsedTargetTeam;
  return (
    <S.PostContainer>
      <S.ImgContainer>
        <Image src={teamImage} alt="게시글" customStyle={S.ViewingImage} />
        <S.WriterInfo>
          <Image
            alt="writer profile image"
            src={writerInfo.image}
            customStyle={S.WriterProfileImage}
          />
          <S.WriterName>{writerInfo.name}</S.WriterName>
        </S.WriterInfo>
      </S.ImgContainer>
      <S.TeamInfoContainer>
        <S.TeamName>{teamName}</S.TeamName>
        <Divider marginTop="14px" />
        <S.SingleInfo>
          <S.SingleInfoTitle>기술 스택</S.SingleInfoTitle>
          <TechSkills skills={techSkills} imageSize="40px" />
        </S.SingleInfo>
        <S.SingleInfo>
          <S.SingleInfoTitle>희망 작업 기간</S.SingleInfoTitle>
          <span>{hopeSession}</span>
        </S.SingleInfo>
        <Divider marginBottom="10px" marginTop="10px" />
        <S.Slogan>{slogan}</S.Slogan>
        <MarkdownEditor onlyViewer content={content} />
        <Divider customStyle={S.CommentDivider} />
        <PostInfo postId={teamId} readCnt={readCnt} likeCnt={likeCnt} commentCnt={commentCnt} />
        <CommentContainer
          postType={DOMAIN_TYPE.TEAM}
          postWriterId={writerInfo.id}
          postId={teamId}
        />
      </S.TeamInfoContainer>
    </S.PostContainer>
  );
}
