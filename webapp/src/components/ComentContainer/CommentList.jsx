/* eslint-disable react/require-default-props */
import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import CommentForm from './CommentForm';
import Comment from './Comment';

function CommentList({
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
              {!isSecret && !parentId && (
                <CommentForm
                  isChild
                  postType={postType}
                  postId={postId}
                  initialText=""
                  submitCallback={handlePostComment}
                  commentInfo={{ id, parentId, secret }}
                  hasCancelButton={false}
                  handleCancel={() => {}}
                />
              )}
              {!isSecret && replies && replies.length !== 0 && (
                <CommentList
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
