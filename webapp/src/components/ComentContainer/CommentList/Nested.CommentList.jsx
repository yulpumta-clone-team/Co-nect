import React from 'react';
import PropTypes from 'prop-types';
import NestedCommentElement from '../CommentElement/Nested.CommentElement';
import * as S from '../style';

NestedCommentList.propTypes = {
  postWriter: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
};

export default function NestedCommentList({ postWriter, comments }) {
  return (
    <S.NestedListContainer>
      {comments.map(({ id, teamId, userId, replies, ...commentInfo }) => (
        <NestedCommentElement
          key={id}
          postWriter={postWriter}
          commentInfo={{ ...commentInfo, id }}
        />
      ))}
    </S.NestedListContainer>
  );
}
