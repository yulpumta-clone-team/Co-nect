import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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

const findParentAndDoCallback = (parents, parentId, callback, callbackParams) => {
  return parents.map((comment) => {
    if (comment.id === parentId) {
      const clone = deepClone(comment);
      clone.replies = callback({ prevComments: clone.replies, ...callbackParams });
      return clone;
    }
    return comment;
  });
};

const addComment = ({ prevComments, newComment }) => {
  return [...prevComments, newComment];
};

const editComment = ({ prevComments, editedComment }) => {
  return deepClone(prevComments).map((comment) =>
    comment.id === editedComment.id ? editedComment : comment,
  );
};

const removeComment = ({ prevComments, id }) => {
  return prevComments.filter((comment) => comment.id !== id);
};

const addLikeToComment = ({ prevComments, id, loggedInUserId }) => {
  return prevComments.map((comment) => {
    if (comment.id === id) {
      const clone = deepClone(comment);
      clone.feeling.push(loggedInUserId);
      return clone;
    }
    return comment;
  });
};

const removeLikeToComment = ({ prevComments, id, loggedInUserId }) => {
  return prevComments.map((comment) => {
    if (comment.id === id) {
      const clone = deepClone(comment);
      clone.feeling = [...clone.feeling].filter((userId) => userId !== loggedInUserId);
      return clone;
    }
    return comment;
  });
};

function CommentContainer({ postType, postWriter, postId }) {
  const [comments, setComments] = useState([]);
  const [editTargetCommentId, setEditTargetCommentId] = useState(DEFAULT_TARGET);
  const userInfo = getUserCookie(); // {name, img, id}
  const loggedInUserName = userInfo?.name;

  const resetTarget = useCallback(() => {
    setEditTargetCommentId(DEFAULT_TARGET);
  }, []);

  const addCommentOnRoot = useCallback(
    async (newCommentData) => {
      const {
        error,
        isError,
        value: newComment,
      } = await handleFetcher(postComment, {
        postType,
        newCommentData,
      });
      if (isError) {
        console.log('error :>> ', error);
        return;
      }
      setComments((prevComments) => addComment({ prevComments, newComment }));
    },
    [postType],
  );

  const addCommentOnNested = useCallback(
    async (newCommentData, commentId) => {
      const {
        error,
        isError,
        value: newComment,
      } = await handleFetcher(postReply, {
        postType,
        newCommentData,
      });
      if (isError) {
        console.log('error :>> ', error);
        return;
      }
      const callbackParams = { newComment };
      setComments((prev) => findParentAndDoCallback(prev, commentId, addComment, callbackParams));
    },
    [postType],
  );

  const handlePostComment = useCallback(
    async (newCommentData, commentId) => {
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
      const {
        error,
        isError,
        value: editedComment,
      } = await handleFetcher(patchComment, {
        postType,
        newCommentData,
        id: commentId,
      });
      if (isError) {
        console.log('error :>> ', error);
        return;
      }
      setComments((prevComments) => editComment({ prevComments, editedComment }));
      resetTarget();
    },
    [postType, resetTarget],
  );

  const editCommentOnNested = useCallback(
    async (newCommentData, commentId, parentId) => {
      const {
        error,
        isError,
        value: editedComment,
      } = await handleFetcher(patchReply, {
        postType,
        newCommentData,
        id: commentId,
      });
      if (isError) {
        console.log('error :>> ', error);
        return;
      }
      const callbackParams = { editedComment };
      setComments((prev) => findParentAndDoCallback(prev, parentId, editComment, callbackParams));
      resetTarget();
    },
    [postType, resetTarget],
  );

  const handleSubmitEditComment = useCallback(
    async (newCommentData, commentId, parentId) => {
      if (parentId) {
        console.log('parentId :>> ', parentId);
        editCommentOnNested(newCommentData, commentId, parentId);
      } else {
        editCommentOnRoot(newCommentData, commentId);
      }
    },
    [editCommentOnNested, editCommentOnRoot],
  );

  const deleteCommentOnRoot = useCallback((id) => {
    setComments((prevComments) => removeComment({ prevComments, id }));
  }, []);

  const deleteCommentOnNested = useCallback((id, parentId) => {
    const callbackParams = { id };
    setComments((prev) => findParentAndDoCallback(prev, parentId, removeComment, callbackParams));
  }, []);

  const handleClickDeleteButton = useCallback(
    async (id, parentId) => {
      const { error, isError } = await handleFetcher(deleteComment, { postType, id });
      if (isError) {
        console.log('error :>> ', error);
        return;
      }
      if (parentId) {
        deleteCommentOnNested(id, parentId);
      } else {
        deleteCommentOnRoot(id);
      }
    },
    [deleteCommentOnNested, deleteCommentOnRoot, postType],
  );

  const addLike = useCallback(async (postType, idObj) => {
    const { id, loggedInUserId, parentId } = idObj;
    const { error, isError } = await handleFetcher(patchCommentLike, { postType, id });
    if (isError) {
      console.log('error :>> ', error);
      return;
    }
    if (parentId) {
      const callbackParams = { id, loggedInUserId };
      setComments((prev) =>
        findParentAndDoCallback(prev, parentId, addLikeToComment, callbackParams),
      );
    } else {
      setComments((prevComments) => addLikeToComment({ prevComments, id, loggedInUserId }));
    }
  }, []);

  const removeLike = useCallback(async (postType, idObj) => {
    const { id, loggedInUserId, parentId } = idObj;
    const { error, isError } = await handleFetcher(patchCommentUnLike, { postType, id });
    if (isError) {
      console.log('error :>> ', error);
      return;
    }
    if (parentId) {
      const callbackParams = { id, loggedInUserId };
      setComments((prev) =>
        findParentAndDoCallback(prev, parentId, removeLikeToComment, callbackParams),
      );
    } else {
      setComments((prevComments) => removeLikeToComment({ prevComments, id, loggedInUserId }));
    }
  }, []);

  const handleClickLikeThumb = useCallback(
    async (id, loggedInUserId, isLikesContainUserId, parentId) => {
      const idObj = { id, loggedInUserId, parentId };
      if (isLikesContainUserId) {
        removeLike(postType, idObj);
      } else {
        addLike(postType, idObj);
      }
    },
    [addLike, postType, removeLike],
  );

  const fetchComments = useCallback(async () => {
    const {
      error,
      isError,
      value: comments,
    } = await handleFetcher(getComment, { postType, postId });
    if (isError) {
      console.log('error :>> ', error);
      return;
    }
    setComments(comments);
  }, [postId, postType]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div>
      <CommentForm
        postType={postType}
        postId={postId}
        initialText=""
        submitCallback={handlePostComment}
        commentInfo={{ id: null, parentId: null, secret: false }}
        hasCancelButton={false}
        handleCancel={() => {}}
      />
      <CommentList
        isReplies={false}
        postType={postType}
        postWriter={postWriter}
        loggedInUserName={loggedInUserName}
        comments={comments}
        editTargetCommentId={editTargetCommentId}
        resetTarget={resetTarget}
        setEditTargetCommentId={setEditTargetCommentId}
        handlePostComment={handlePostComment}
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
