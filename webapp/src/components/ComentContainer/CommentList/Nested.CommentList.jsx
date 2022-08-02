import React from 'react';
import PropTypes from 'prop-types';
import { useCommentsAction } from 'contexts/Comment/Comment.Provider';
import * as S from '../style';
import NestedCommentElement from '../CommentElement/Nested.CommentElement';

NestedCommentList.propTypes = {
  loggedInUserName: PropTypes.string,
  postWriter: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
};

export default function NestedCommentList({ postWriter, loggedInUserName, comments }) {
  const { isShowSecretComment } = useCommentsAction();
  return (
    <S.ListBox>
      {comments.map(({ id, teamId, userId, replies, ...commentInfo }) => {
        const { secret, writer: commenWriter, parentId } = commentInfo;
        const isSecret = isShowSecretComment(secret, postWriter, commenWriter, loggedInUserName);
        return (
          <li key={id}>
            <NestedCommentElement
              commentId={id}
              isSecret={isSecret}
              postWriter={postWriter}
              commentInfo={commentInfo}
            />
          </li>
        );
      })}
    </S.ListBox>
  );
}
