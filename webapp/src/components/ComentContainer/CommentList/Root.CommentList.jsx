import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useCommentsAction, useCommentsState } from 'contexts/Comment/Comment.Provider';

import * as S from '../style';
import NestedCommentList from './Nested.CommentList';
import RootCommentElement from '../CommentElement/Root.CommentElement';
import { CreateReplyCommentForm } from '../CommentForm/Create.Reply.CommentForm';

RootCommentList.propTypes = {
  loggedInUserName: PropTypes.string,
  postWriter: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
};

export default function RootCommentList({ postWriter, loggedInUserName, comments }) {
  const {
    showCreateReplyFormOnTargetComment,
    showReplyList,
    resetShowReplyList,
    isShowSecretComment,
  } = useCommentsAction();
  const { createReplyTargetCommentId, targetReplyListId } = useCommentsState();

  const isShowReplies = (commentId) => commentId === targetReplyListId;

  const handleClickShowReplyButton = (commentId) => showReplyList(commentId);
  const handleClickHideReplyButton = (commentId) => resetShowReplyList(commentId);
  const handleClickShowCreateForm = (commentId) => showCreateReplyFormOnTargetComment(commentId);

  return (
    <S.ListBox>
      {comments &&
        comments.length !== 0 &&
        comments.map(({ id, teamId, userId, replies, ...commentInfo }) => {
          const { secret, writer: commenWriter } = commentInfo;
          const isSecret = isShowSecretComment(secret, postWriter, commenWriter, loggedInUserName);
          return (
            <li key={id}>
              <RootCommentElement
                commentId={id}
                isSecret={isSecret}
                postWriter={postWriter}
                commentInfo={commentInfo}
              />
              <S.ReplyButtons>
                {!isSecret && isShowReplies(id) && (
                  <button onClick={() => handleClickHideReplyButton(id)}>답글 가리기</button>
                )}
                {!isSecret && !isShowReplies(id) && (
                  <button onClick={() => handleClickShowReplyButton(id)}>답글 보여주기</button>
                )}
                {!isSecret && createReplyTargetCommentId !== id && (
                  <button onClick={() => handleClickShowCreateForm(id)}>답글 작성하기</button>
                )}
              </S.ReplyButtons>
              {!isSecret && createReplyTargetCommentId === id && (
                <CreateReplyCommentForm secret={secret} commentId={id} />
              )}
              {!isSecret && replies && replies.length !== 0 && isShowReplies(id) && (
                <NestedCommentList
                  postWriter={postWriter}
                  loggedInUserName={loggedInUserName}
                  comments={replies}
                />
              )}
            </li>
          );
        })}
    </S.ListBox>
  );
}
