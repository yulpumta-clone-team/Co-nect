/* eslint-disable react/require-default-props */
import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import CommentForm from './CommentForm';
import Comment from './Comment';

const DEFAULT_TARGET = -1;

function CommentList({
  isReplies,
  postType,
  postWriter,
  loggedInUserName,
  comments,
  editTargetCommentId,
  resetTarget,
  handlePostComment,
  setEditTargetCommentId,
  handleSubmitEditComment,
  handleClickDeleteButton,
  handleClickLikeThumb,
}) {
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
    <ul>
      {comments &&
        comments.length !== 0 &&
        comments.map(({ id, teamId, userId, replies, ...commentInfo }) => {
          const { secret, writer: commenWriter, parentId } = commentInfo;
          const postId = teamId || userId;
          const isSecret = isShowSecretComment(secret, postWriter, commenWriter, loggedInUserName);
          return (
            <li key={id}>
              <Comment
                id={id}
                isSecret={isSecret}
                postType={postType}
                postId={postId}
                postWriter={postWriter}
                commentInfo={commentInfo}
                editTargetCommentId={editTargetCommentId}
                resetTarget={resetTarget}
                setEditTargetCommentId={setEditTargetCommentId}
                handleSubmitEditComment={handleSubmitEditComment}
                handleClickDeleteButton={handleClickDeleteButton}
                handleClickLikeThumb={handleClickLikeThumb}
              />
              {!isSecret && !isReplies && !isShowReplies && (
                <button onClick={handleShowReplies}>답글 보여주기</button>
              )}
              {!isSecret && !isReplies && isShowReplies && (
                <button onClick={handleShowReplies}>답글 가리기</button>
              )}
              {!isSecret && !isReplies && replyFormCommentId !== id && (
                <button onClick={() => setReplyFormCommentId(id)}>답글 작성하기</button>
              )}
              {!isSecret && !parentId && replyFormCommentId === id && (
                <CommentForm
                  postType={postType}
                  postId={postId}
                  initialText=""
                  submitCallback={handlePostComment}
                  commentInfo={{ id, parentId, secret }}
                  hasCancelButton
                  handleCancel={() => setReplyFormCommentId(DEFAULT_TARGET)}
                />
              )}
              {!isSecret && replies && replies.length !== 0 && isShowReplies && (
                <CommentList
                  isReplies
                  postType={postType}
                  postWriter={postWriter}
                  postId={postId}
                  loggedInUserName={loggedInUserName}
                  comments={replies}
                  editTargetCommentId={editTargetCommentId}
                  resetTarget={resetTarget}
                  handlePostComment={handlePostComment}
                  setEditTargetCommentId={setEditTargetCommentId}
                  handleSubmitEditComment={handleSubmitEditComment}
                  handleClickDeleteButton={handleClickDeleteButton}
                  handleClickLikeThumb={handleClickLikeThumb}
                />
              )}
            </li>
          );
        })}
    </ul>
  );
}

CommentList.propTypes = {
  isReplies: PropTypes.bool.isRequired,
  loggedInUserName: PropTypes.string,
  postType: PropTypes.string.isRequired,
  postWriter: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  editTargetCommentId: PropTypes.number.isRequired,
  resetTarget: PropTypes.func.isRequired,
  handlePostComment: PropTypes.func.isRequired,
  setEditTargetCommentId: PropTypes.func.isRequired,
  handleSubmitEditComment: PropTypes.func.isRequired,
  handleClickDeleteButton: PropTypes.func.isRequired,
  handleClickLikeThumb: PropTypes.func.isRequired,
};

export default memo(CommentList);
