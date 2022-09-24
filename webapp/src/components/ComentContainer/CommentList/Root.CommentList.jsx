import React from 'react';
import PropTypes from 'prop-types';
import { useCommentsAction, useCommentsState } from 'contexts/Comment/Comment.Provider';
import RootCommentElement from '../CommentElement/Root.CommentElement';
import * as S from '../style';

RootCommentList.propTypes = {
  postWriter: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
};

export default function RootCommentList({ postWriter, comments }) {
  return (
    <S.RootListContainer>
      {comments.map(({ id, teamId, userId, replies, ...commentInfo }) => (
        <RootCommentElement
          key={id}
          commentInfo={{ ...commentInfo, id }}
          postWriter={postWriter}
          replies={replies}
        />
      ))}
    </S.RootListContainer>
  );
}
