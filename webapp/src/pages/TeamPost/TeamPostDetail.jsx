/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import MarkdownViewer from 'components/MarkdownViewer';
import CommentContainer from 'components/ComentContainer';
import { POST_TYPE } from 'constant';

import * as S from './style';

export default function TeamPostDetail({ targetTeam }) {
  const { id, name, content, session, img, read, skills, commentCnt, likeCnt, user } = targetTeam;

  return (
    <S.Container>
      <img src={img} alt="게시글" />
      <MarkdownViewer mdValue={content} />
      <div>
        이름 : {name} / 팀명 : {name}
      </div>
      <div>좋아요 개수 : {likeCnt}</div>
      <CommentContainer postType={POST_TYPE.TEAM} postWriter={user.name} postId={id} />
    </S.Container>
  );
}
