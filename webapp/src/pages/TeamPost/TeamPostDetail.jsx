import React from 'react';
import CommentContainer from 'components/ComentContainer';
import MarkdownEditor from 'components/MarkdownEditor';
import { POST_TYPE } from 'constant';
import Divider from 'components/Common/Divider';
import { teamDetailParser } from 'service/team/team.parser';
import TechSkills from 'components/TechSkills';
import Image from 'components/Common/Image';
import Like from 'components/Common/Like';
import ChatBubbleOvalSvg from 'assets/icons/ChatBubbleOvalSvg';
import EyeSvg from 'assets/icons/EyeSvg';
import { teamDetailType } from 'types/team.type';
import ProfileImg from 'components/ProfileImg';
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
  } = parsedTargetTeam;
  return (
    <S.PostContainer>
      <S.ImgContainer>
        <Image src={teamImage} alt="게시글" customStyle={S.ViewingImage} />
        <S.WriterInfo>
          <ProfileImg
            src={writerInfo.image}
            alt="프로필 이미지"
            customStyle={S.WriterProfileImage}
          />
          <S.WriterName>{writerInfo.name}</S.WriterName>
        </S.WriterInfo>
      </S.ImgContainer>
      <S.TeamInfoContainer>
        <S.TeamName>{teamName}</S.TeamName>
        <Divider />
        <S.SingleInfo>
          <S.SingleInfoTitle>기술 스택</S.SingleInfoTitle>
          <TechSkills skills={techSkills} imageSize="40px" />
        </S.SingleInfo>
        <S.SingleInfo>
          <S.SingleInfoTitle>희망 작업 기간</S.SingleInfoTitle>
          <span>{hopeSession}</span>
        </S.SingleInfo>
        <Divider />
        <S.Slogan>{slogan}</S.Slogan>
        <MarkdownEditor onlyViewer content={content} />
        <Divider customStyle={S.CommentDivider} />
        <S.PostInfo>
          <S.SinglePostInfo>
            <EyeSvg />
            <span>000</span>
          </S.SinglePostInfo>
          <S.SinglePostInfo>
            <S.SinglePostInfo>
              <Like id={teamId} />
              <span>{likeCnt}</span>
            </S.SinglePostInfo>
            <S.SinglePostInfo>
              <ChatBubbleOvalSvg />
              <span>{commentCnt}</span>
            </S.SinglePostInfo>
          </S.SinglePostInfo>
        </S.PostInfo>
        <CommentContainer postType={POST_TYPE.TEAM} postWriter={writerInfo.name} postId={teamId} />
      </S.TeamInfoContainer>
    </S.PostContainer>
  );
}
