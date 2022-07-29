import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useCommentsAction } from 'contexts/Comment/Comment.Provider';
import CommentForm from '../CommentForm';

import * as S from '../style';
import NestedCommentList from './Nested.CommentList';
import RootCommentElement from '../CommentElement/Root.CommentElement';

const DEFAULT_TARGET = -1;

RootCommentList.propTypes = {
  loggedInUserName: PropTypes.string,
  postWriter: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
};

export default function RootCommentList({ postWriter, loggedInUserName, comments }) {
  const { resetTarget, postReplyApi } = useCommentsAction();
  const [isShowReplies, setIsShowReplies] = useState(false);
  const [replyFormCommentId, setReplyFormCommentId] = useState(DEFAULT_TARGET);
  // ! 해당하는 대댓글만 보이게 수정하기
  const handleShowReplies = useCallback(() => {
    setIsShowReplies((prev) => !prev);
  }, []);

  const checkSecretComment = useCallback((postWriterName, commentWriterName, loggedInUserName) => {
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
  }, []);

  const isShowSecretComment = useCallback(
    (secret, postWriterName, commentWriterName, loggedInUserName) => {
      // secret ? 가리기 : 보여주기
      if (secret) {
        const isShow = checkSecretComment(postWriterName, commentWriterName, loggedInUserName);
        return isShow;
      }
      return false;
    },
    [checkSecretComment],
  );
  return (
    <S.ListBox>
      {comments &&
        comments.length !== 0 &&
        comments.map(({ id, teamId, userId, replies, ...commentInfo }) => {
          const { secret, writer: commenWriter, parentId } = commentInfo;
          const isSecret = isShowSecretComment(secret, postWriter, commenWriter, loggedInUserName);
          return (
            <li key={id}>
              <RootCommentElement
                id={id}
                isSecret={isSecret}
                postWriter={postWriter}
                commentInfo={commentInfo}
              />
              <S.ReplyButtons>
                {!isSecret && !isShowReplies && (
                  <button onClick={handleShowReplies}>답글 보여주기</button>
                )}
                {!isSecret && isShowReplies && (
                  <button onClick={handleShowReplies}>답글 가리기</button>
                )}
                {!isSecret && replyFormCommentId !== id && (
                  <button onClick={() => setReplyFormCommentId(id)}>답글 작성하기</button>
                )}
              </S.ReplyButtons>
              {!isSecret && !parentId && replyFormCommentId === id && (
                <CommentForm
                  initialText=""
                  submitCallback={postReplyApi}
                  commentInfo={{ id, parentId, secret }}
                  hasCancelButton
                  hasDeleteButton={false}
                  handleCancel={() => setReplyFormCommentId(DEFAULT_TARGET)}
                />
              )}
              {!isSecret && replies && replies.length !== 0 && isShowReplies && (
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
