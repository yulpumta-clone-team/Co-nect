import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  deleteComment,
  getComment,
  patchComment,
  patchCommentLike,
  patchCommentUnLike,
  patchReply,
  postComment,
  postReply,
} from 'apiAction/comment';
import { handleFetcher } from 'utils';
import { getUserCookie } from 'utils/cookie';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const DEFAULT_TARGET = -1;

const deepClone = (originalObject) => JSON.parse(JSON.stringify(originalObject));

function CommentContainer({ postType, postWriter, postId }) {
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const [editTargetCommentId, setEditTargetCommentId] = useState(DEFAULT_TARGET);
  const userInfo = getUserCookie(); // {name, img, id}
  const loggedInUserName = userInfo?.name;

  const resetTarget = useCallback(() => {
    setEditTargetCommentId(DEFAULT_TARGET);
  }, []);

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

  const deleteCommentOnRoot = useCallback((id) => {
    const deleteTargetComment = (prev) => prev.filter((comment) => comment.id !== id);
    setComments(deleteTargetComment);
  }, []);

  const deleteCommentOnNested = useCallback((id, parentId) => {
    const deleteTargetNestedComent = (comments) =>
      comments.map((comment) => {
        if (comment.id === parentId) {
          const clone = [...comment.replies];
          comment.replies = clone.filter((reply) => reply.id !== id);
        }
        return comment;
      });
    setComments(deleteTargetNestedComent);
  }, []);

  const handleClickDeleteButton = useCallback(
    async (id, parentId) => {
      const { isError } = await handleFetcher(deleteComment, { postType, id }, dispatch);
      if (isError) {
        return;
      }
      if (parentId) {
        deleteCommentOnNested(id, parentId);
      } else {
        deleteCommentOnRoot(id);
      }
    },
    [deleteCommentOnNested, deleteCommentOnRoot, dispatch, postType],
  );

  const addLikeToComment = (prevComments, id, loggedInUserId) =>
    prevComments.map((comment) => {
      if (comment.id === id) {
        const clone = deepClone(comment);
        clone.feeling.push(loggedInUserId);
        return clone;
      }
      return comment;
    });

  const removeLikeToComment = (prevComments, id, loggedInUserId) =>
    prevComments.map((comment) => {
      if (comment.id === id) {
        const clone = deepClone(comment);
        clone.feeling = [...clone.feeling].filter((userId) => userId !== loggedInUserId);
        return clone;
      }
      return comment;
    });

  const addLikeToNestComment = useCallback(
    (prevComments, parentId, id, loggedInUserId) =>
      prevComments.map((comment) => {
        if (comment.id === parentId) {
          const clone = deepClone(comment);
          clone.replies = addLikeToComment(clone.replies, id, loggedInUserId);
          return clone;
        }
        return comment;
      }),
    [],
  );

  const removeLikeToNestComment = useCallback(
    (prevComments, parentId, id, loggedInUserId) =>
      prevComments.map((comment) => {
        if (comment.id === parentId) {
          const clone = deepClone(comment);
          clone.replies = removeLikeToComment(clone.replies, id, loggedInUserId);
          return clone;
        }
        return comment;
      }),
    [],
  );

  const addLike = useCallback(
    async (postType, idObj) => {
      const { id, loggedInUserId, parentId } = idObj;
      const { isError } = await handleFetcher(patchCommentLike, { postType, id }, dispatch);
      if (isError) {
        return;
      }
      if (parentId) {
        setComments((prev) => addLikeToNestComment(prev, parentId, id, loggedInUserId));
      } else {
        setComments((prev) => addLikeToComment(prev, id, loggedInUserId));
      }
    },
    [addLikeToNestComment, dispatch],
  );

  const removeLike = useCallback(
    async (postType, idObj) => {
      const { id, loggedInUserId, parentId } = idObj;
      const { isError } = await handleFetcher(patchCommentUnLike, { postType, id }, dispatch);
      if (isError) {
        return;
      }
      if (parentId) {
        setComments((prev) => removeLikeToNestComment(prev, parentId, id, loggedInUserId));
      } else {
        setComments((prev) => removeLikeToComment(prev, id, loggedInUserId));
      }
    },
    [dispatch, removeLikeToNestComment],
  );

  const handleClickLikeThumb = useCallback(
    async (id, loggedInUserId, isLikesContainUserId, parentId) => {
      const idObj = { id, loggedInUserId, parentId };
      if (isLikesContainUserId) {
        // 좋아요 취소
        removeLike(postType, idObj);
      } else {
        // 좋아요 등록
        addLike(postType, idObj);
      }
    },
    [addLike, postType, removeLike],
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

  return (
    <div>
      <CommentForm
        isChild={false}
        postType={postType}
        postId={postId}
        initialText=""
        submitCallback={handlePostComment}
        commentInfo={{ id: null, parentId: null, secret: false }}
        hasCancelButton={false}
        handleCancel={() => {}}
      />
      <CommentList
        postType={postType}
        postWriter={postWriter}
        loggedInUserName={loggedInUserName}
        comments={comments}
        editTargetCommentId={editTargetCommentId}
        resetTarget={resetTarget}
        handlePostComment={handlePostComment}
        setEditTargetCommentId={setEditTargetCommentId}
        handleSubmitEditComment={handleSubmitEditComment}
        handleClickDeleteButton={handleClickDeleteButton}
        handleClickLikeThumb={handleClickLikeThumb}
      />
    </div>
  );
}
CommentContainer.propTypes = {
  postType: PropTypes.string.isRequired,
  postWriter: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
};

export default memo(CommentContainer);
