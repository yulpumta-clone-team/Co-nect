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
import Like from 'components/Common/Like';
import * as S from './TeamPost.style';

export default function TeamPostDetail({ targetTeam }) {
  const parsedTargetTeam = teamDetailParser(targetTeam);
  const { id, name, user, content, img, hopeSession, skills, slogan, commentCnt, likeCnt } =
    parsedTargetTeam;
  const [like, setLike] = useState(false);

  // useEffect(async () => {
  //   const fetchData = async () => {
  //     const res = await teamApi.GET_TEAM_LIKES;
  //     console.log(res);
  //     if (res.data.likecnt === true) setLike(true); // 여기 이 status 부분이 api가 뭐로 해줘야할까? likecnt가 1올라갔을때?
  //   };
  //   fetchData();
  // }, []);

  const toggleLike = async (e) => {
    // [POST] 사용자가 좋아요를 누름 -> DB 갱신
    setLike(!like);
    // const res = await teamApi.PATCH_TEAM_LIKE({ id, like });
    // console.log(res.data);
  };

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
          <S.TeamName>{name}</S.TeamName>
        </S.SingleInfo>
        <Divider />
        <S.Skill>
          <S.TeamSkillSession>기술 스택</S.TeamSkillSession>
          <TechSkills skills={skills} imageSize="40px" />
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
          <Like like={like} onClick={toggleLike} />
          {likeCnt}
          <S.Chat />
          {commentCnt}
        </S.SingleInfo>
        <CommentContainer postType={POST_TYPE.TEAM} postWriter={user.name} postId={id} />
      </S.TeamInfoContainer>
    </S.PostContainer>
  );
}
