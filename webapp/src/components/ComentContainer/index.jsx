import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  deleteComment,
  getComment,
  patchComment,
  postComment,
  postCommentLike,
} from 'apiAction/comment';
import { handleFetcher, setPostIdOnSubmitData } from 'utils';
import { getUserCookie } from 'utils/cookie';
import Comment from 'components/ComentContainer/Comment';
import CommentForm from './CommentForm';

const DEFAULT_TARGET = -1;

function CommentContainer({ postType, postWriter, postId }) {
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const [editTargetCommentId, setEditTargetCommentId] = useState(DEFAULT_TARGET);
  const userInfo = getUserCookie(); // {name, img, id}
  const loggedInUserName = userInfo?.name;
  const loggedInUserId = userInfo?.id;

  const resetTarget = useCallback(() => {
    setEditTargetCommentId(DEFAULT_TARGET);
  }, []);

  const handlePostComment = useCallback(
    async (newCommentData) => {
      const { isError, value: newComment } = await handleFetcher(
        postComment,
        { postType, newCommentData },
        dispatch,
      );
      if (isError) {
        return;
      }
      setComments((prev) => [...prev, newComment]);
    },
    [dispatch, postType],
  );

  const handleSubmitEditComment = useCallback(
    async (newCommentData) => {
      const { isError, value: editedComment } = await handleFetcher(
        patchComment,
        { postType, postId, newCommentData },
        dispatch,
      );
      if (isError) {
        return;
      }
      const getNewComments = comments.map((comment) =>
        comment.id === editedComment.id ? editedComment : comment,
      );
      setComments(getNewComments);
      resetTarget();
    },
    [comments, dispatch, postId, postType, resetTarget],
  );

  const handleClickDeleteButton = useCallback(
    async (id) => {
      const { isError } = await handleFetcher(deleteComment, { postType, id }, dispatch);
      if (isError) {
        return;
      }
      const removeDeletedTarget = (prev) => prev.filter((comment) => comment.id !== id);
      setComments(removeDeletedTarget);
    },
    [dispatch, postType],
  );

  // TODO: 서버와 api 연결하기
  const handleChangeToSecret = useCallback((id) => {
    const getNewComments = (prev) =>
      prev.map((comment) =>
        comment.id === id ? { ...comment, secret: !comment.secret } : comment,
      );
    setComments(getNewComments);
  }, []);

  const handleClickLikeThumb = useCallback(
    async (id, loggedInUserId, isLikesContainUserId) => {
      const { isError } = await handleFetcher(postCommentLike, { postType, id }, dispatch);
      if (isError) {
        return;
      }
      const handleLikeUserId = (oldComment) => {
        const targetLikes = [...oldComment.feeling];
        if (isLikesContainUserId) {
          const newLikes = targetLikes.filter((id) => id !== loggedInUserId);
          return { ...oldComment, feeling: newLikes };
        }
        targetLikes.push(loggedInUserId);
        return { ...oldComment, feeling: targetLikes };
      };
      const getNewComments = (prev) =>
        prev.map((comment) => (comment.id === id ? handleLikeUserId(comment) : comment));
      setComments(getNewComments);
    },
    [dispatch, postType],
  );

  const fetchComments = useCallback(async () => {
    const { isError, value: comments } = await handleFetcher(
      getComment,
      { postType, postId },
      dispatch,
    );
    if (isError) {
      return;
    }
    setComments(comments);
  }, [dispatch, postId, postType]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

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

  const CommentList = ({ id, comments }) => {
    return comments.map(({ id, teamId, userId, replies, ...commentInfo }) => {
      const { secret, writer: commenWriter } = commentInfo;
      const postId = teamId || userId;
      const isSecret = isShowSecretComment(secret, postWriter, commenWriter, loggedInUserName);
      return (
        <div key={id}>
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
            handleChangeToSecret={handleChangeToSecret}
            handleClickLikeThumb={handleClickLikeThumb}
          />
          {!isSecret && replies && replies.length !== 0 && (
            <CommentList id={`${id + postId}`} comments={replies} />
          )}
        </div>
      );
    });
  };
  return (
    <div>
      <CommentForm
        postType={postType}
        postId={postId}
        initialText=""
        submitCallback={handlePostComment}
        commentInfo={{ id: null, parentId: null }}
        hasCancelButton={false}
        handleCancel={() => {}}
      />
      {comments && comments.length !== 0 && <CommentList comments={comments} />}
    </div>
  );
}
CommentContainer.propTypes = {
  postType: PropTypes.string.isRequired,
  postWriter: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
};

export default memo(CommentContainer);
