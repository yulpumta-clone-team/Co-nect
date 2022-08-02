import React from 'react';
import PropTypes from 'prop-types';
import { useCommentsAction, useCommentsState } from 'contexts/Comment/Comment.Provider';
import * as S from '../style';
import NestedCommentElement from '../CommentElement/Nested.CommentElement';

NestedCommentList.propTypes = {
  postWriter: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
};

export default function NestedCommentList({ postWriter, comments }) {
  const { isShowSecretComment } = useCommentsAction();
  const { userInfo } = useCommentsState();

  const loggedInUserName = userInfo?.name;
  return (
    <S.ListBox>
      {comments.map(({ id, teamId, userId, replies, ...commentInfo }) => {
        const { secret, writer: commenWriter, parentId } = commentInfo;
        const isSecret = isShowSecretComment(secret, postWriter, commenWriter, loggedInUserName);
        return (
          <li key={id}>
            <NestedCommentElement
              commentId={id}
              postWriter={postWriter}
              commentInfo={commentInfo}
            />
          </li>
        );
      })}
    </S.ListBox>
  );
}
