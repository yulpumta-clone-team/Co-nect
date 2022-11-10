import React from 'react';
import PropTypes from 'prop-types';
import NestedCommentElement from '../CommentElement/Nested.CommentElement';
import * as S from '../style';

NestedCommentList.propTypes = {
  postWriterId: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
};

export default function NestedCommentList({ postWriterId, comments }) {
  return (
    <S.NestedListContainer>
      {comments.map(({ id, teamId, userId, ...commentInfo }) => (
        <NestedCommentElement
          key={id}
          postWriterId={postWriterId}
          commentInfo={{ ...commentInfo, id }}
        />
      ))}
    </S.NestedListContainer>
  );
}
