/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import MarkdownViewer from 'components/MdViewer';
import CommentContainer from 'components/ComentContainer';
import { POST_TYPE } from 'constant';

import * as S from './style';

export default function UserPostDetail({ targetUser }) {
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
  } = targetUser;

  return (
    <S.Container>
      <img src={img} alt="게시글" />
      <MarkdownViewer mdValue={content} />
      <div>이름 : {name}</div>
      <div>좋아요 개수 : {likeCnt}</div>
      <CommentContainer postWriter={name} />
    </S.Container>
  );
}
