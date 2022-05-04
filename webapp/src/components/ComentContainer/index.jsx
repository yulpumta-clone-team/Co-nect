import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  deleteComment,
  getComment,
  patchComment,
  patchReply,
  postComment,
  postCommentLike,
  postReply,
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

  const addCommentOnRoot = useCallback(
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

  const addCommentOnNested = useCallback(
    async (newCommentData, commentId) => {
      console.log('commentId :>> ', commentId, newCommentData);
      const { isError, value: newComment } = await handleFetcher(
        postReply,
        { postType, newCommentData },
        dispatch,
      );
      if (isError) {
        return;
      }
      const findParentComment = (comments) =>
        comments.map((comment) => {
          if (comment.id === commentId) {
            comment.replies.push(newComment);
          }
          return comment;
        });
      setComments(findParentComment);
    },
    [dispatch, postType],
  );

  const handlePostComment = useCallback(
    async (newCommentData, commentId) => {
      // post의 경우 commentId로 구분
      if (commentId) {
        addCommentOnNested(newCommentData, commentId);
      } else {
        addCommentOnRoot(newCommentData);
      }
    },
    [addCommentOnNested, addCommentOnRoot],
  );

  const editCommentOnRoot = useCallback(
    async (newCommentData, commentId) => {
      const { isError, value: editedComment } = await handleFetcher(
        patchReply,
        { postType, newCommentData, id: commentId },
        dispatch,
      );
      if (isError) {
        return;
      }
      const editTargetComment = comments.map((comment) =>
        comment.id === editedComment.id ? editedComment : comment,
      );
      setComments(editTargetComment);
      resetTarget();
    },
    [comments, dispatch, postType, resetTarget],
  );

  const editCommentOnNested = useCallback(
    async (newCommentData, commentId, parentId) => {
      const { isError, value: editedComment } = await handleFetcher(
        patchComment,
        { postType, newCommentData, id: commentId },
        dispatch,
      );
      if (isError) {
        return;
      }
      const editTargetNestedComment = (comments) =>
        comments.map((comment) => {
          if (comment.id === parentId) {
            const clone = [...comment.replies];
            comment.replies = clone.map((reply) =>
              reply.id === commentId ? editedComment : reply,
            );
          }
          return comment;
        });
      setComments(editTargetNestedComment);
      resetTarget();
    },
    [dispatch, postType, resetTarget],
  );

  const handleSubmitEditComment = useCallback(
    async (newCommentData, commentId, parentId) => {
      if (parentId) {
        editCommentOnNested(newCommentData, commentId, parentId);
      } else {
        editCommentOnRoot(newCommentData, commentId);
      }
    },
    [editCommentOnNested, editCommentOnRoot],
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

  // TODO: 서버와 api 연결하기
  const handleChangeToSecret = useCallback((id) => {
    const getNewComments = (prev) =>
      prev.map((comment) =>
        comment.id === id ? { ...comment, secret: !comment.secret } : comment,
      );
    setComments(getNewComments);
  }, []);

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

  // console.log('comments :>> ', comments);
  const CommentList = ({ id, comments }) => {
    return comments.map(({ id, teamId, userId, replies, ...commentInfo }) => {
      const { secret, writer: commenWriter, parentId } = commentInfo;
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
          {!isSecret && !parentId && (
            <CommentForm
              isChild
              postType={postType}
              postId={postId}
              initialText=""
              submitCallback={handlePostComment}
              commentInfo={{ id, parentId }}
              hasCancelButton={false}
              handleCancel={() => {}}
            />
          )}
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
        isChild={false}
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
