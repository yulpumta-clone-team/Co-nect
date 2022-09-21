import React from 'react';
import PropTypes from 'prop-types';
import { useCommentsAction, useCommentsState } from 'contexts/Comment/Comment.Provider';
import * as S from '../style';
import NestedCommentElement from '../CommentElement/Nested.CommentElement';
import HocSecretComment from '../Hoc/HocSecretComment';

NestedCommentList.propTypes = {
  postWriter: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
};

export default function NestedCommentList({ postWriter, comments }) {
  const { isShowSecretComment } = useCommentsAction();
  const { userInfo } = useCommentsState();

  const loggedInUserName = userInfo?.name;
  return (
    <S.NestedListContainer>
      {comments.map(({ id, teamId, userId, replies, ...commentInfo }) => {
        const { secret, writer: commenWriter, parentId } = commentInfo;
        const isSecret = isShowSecretComment(secret, postWriter, commenWriter, loggedInUserName);
        const WithSecretComment = HocSecretComment({ isSecret, Component: NestedCommentElement });
        return (
          <WithSecretComment
            key={id}
            commentId={id}
            postWriter={postWriter}
            commentInfo={commentInfo}
          />
        );
      })}
    </S.NestedListContainer>
  );
}
