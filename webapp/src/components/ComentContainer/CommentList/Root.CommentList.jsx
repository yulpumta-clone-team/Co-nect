import React from 'react';
import PropTypes from 'prop-types';
import RootCommentElement from '../CommentElement/Root.CommentElement';
import * as S from '../style';

RootCommentList.propTypes = {
  postWriter: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
};

export default function RootCommentList({ postWriter, comments }) {
  return (
    <S.RootListContainer>
      {/* FIXME: api명세가 replies에서 comments로 바뀌어서 임시로 수정해 놓음 */}
      {comments.map(({ id, teamId, userId, comments: replies, ...commentInfo }) => (
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
