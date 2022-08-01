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
  const { showCreateReplyFormOnTargetComment, showReplyList, resetShowReplyList } =
    useCommentsAction();
  const { createReplyTargetCommentId, targetReplyListId } = useCommentsState();

  const isShowReplies = (commentId) => commentId === targetReplyListId;

  const handleClickShowReplyButton = (commentId) => showReplyList(commentId);
  const handleClickHideReplyButton = (commentId) => resetShowReplyList(commentId);
  const handleClickShowCreateForm = (commentId) => showCreateReplyFormOnTargetComment(commentId);

  const checkSecretComment = (postWriterName, commentWriterName, loggedInUserName) => {
    // true: 가리기 , false: 보여주기
    if (!loggedInUserName) {
      return true;
    }
    const isSameCommentWriter = () => postWriterName === loggedInUserName;
    const isSamePostWriter = () => commentWriterName === loggedInUserName;
    if (isSameCommentWriter() || isSamePostWriter()) {
      return false;
    }

    return true;
  };

  const isShowSecretComment = (secret, postWriterName, commentWriterName, loggedInUserName) => {
    // secret ? 가리기 : 보여주기
    if (secret) {
      const isShow = checkSecretComment(postWriterName, commentWriterName, loggedInUserName);
      return isShow;
    }
    return false;
  };
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
