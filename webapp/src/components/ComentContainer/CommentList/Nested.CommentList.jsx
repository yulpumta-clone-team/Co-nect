import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useCommentsAction } from 'contexts/Comment/Comment.Provider';
import CommentForm from '../CommentForm';

import * as S from '../style';
import NestedCommentElement from '../CommentElement/Nested.CommentElement';

const DEFAULT_TARGET = -1;

NestedCommentList.propTypes = {
  isReplies: PropTypes.bool.isRequired,
  loggedInUserName: PropTypes.string,
  postType: PropTypes.string.isRequired,
  postWriter: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  handleClickDeleteButton: PropTypes.func.isRequired,
  handleClickLikeThumb: PropTypes.func.isRequired,
};

export default function NestedCommentList({
  isReplies,
  postType,
  postWriter,
  loggedInUserName,
  comments,
  handleClickDeleteButton,
  handleClickLikeThumb,
}) {
  const { resetTarget } = useCommentsAction();
  const [isShowReplies, setIsShowReplies] = useState(false);
  const [replyFormCommentId, setReplyFormCommentId] = useState(DEFAULT_TARGET);

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
          const postId = teamId || userId;
          const isSecret = isShowSecretComment(secret, postWriter, commenWriter, loggedInUserName);
          return (
            <li key={id}>
              <NestedCommentElement
                id={id}
                isSecret={isSecret}
                postType={postType}
                postId={postId}
                postWriter={postWriter}
                commentInfo={commentInfo}
                resetTarget={resetTarget}
                handleClickDeleteButton={handleClickDeleteButton}
                handleClickLikeThumb={handleClickLikeThumb}
              />
              <S.ReplyButtons>
                {!isSecret && !isReplies && !isShowReplies && (
                  <button onClick={handleShowReplies}>답글 보여주기</button>
                )}
                {!isSecret && !isReplies && isShowReplies && (
                  <button onClick={handleShowReplies}>답글 가리기</button>
                )}
                {!isSecret && !isReplies && replyFormCommentId !== id && (
                  <button onClick={() => setReplyFormCommentId(id)}>답글 작성하기</button>
                )}
              </S.ReplyButtons>
            </li>
          );
        })}
    </S.ListBox>
  );
}
