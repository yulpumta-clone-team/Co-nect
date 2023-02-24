import React from 'react';
import PropTypes from 'prop-types';
import RootCommentElement from '../CommentElement/Root.CommentElement';
import * as S from '../Comment.style';

RootCommentList.propTypes = {
  postWriterId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
};

export default function RootCommentList({ postWriterId, comments }) {
  return (
    <S.RootListContainer>
      {comments.map(({ id, teamId, userId, ...commentInfo }) => (
        <RootCommentElement
          key={id}
          commentInfo={{ ...commentInfo, id }}
          postWriterId={postWriterId}
        />
      ))}
    </S.RootListContainer>
  );
}
