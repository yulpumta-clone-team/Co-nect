import React from 'react';
import PropTypes from 'prop-types';
import { useCommentsAction, useCommentsState } from 'contexts/Comment/Comment.Provider';
import HocSecretComment from '../Hoc/HocSecretComment';
import HocNestedComment from '../Hoc/Hoc.NestedComment';
import * as S from '../style';

RootCommentList.propTypes = {
  postWriter: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
};

export default function RootCommentList({ postWriter, comments }) {
  const { isShowSecretComment } = useCommentsAction();
  const { userInfo } = useCommentsState();

  const loggedInUserName = userInfo?.name;

  return (
    <S.ListBox>
      {comments.map(({ id, teamId, userId, replies, ...commentInfo }) => {
        const { secret, writer: commenWriter } = commentInfo;
        const isSecret = isShowSecretComment(secret, postWriter, commenWriter, loggedInUserName);
        const WithSecretComment = HocSecretComment({ isSecret, Component: HocNestedComment });
        return (
          <WithSecretComment
            key={id}
            commentInfo={{ ...commentInfo, id }}
            postWriter={postWriter}
            replies={replies}
          />
        );
      })}
    </S.ListBox>
  );
}
