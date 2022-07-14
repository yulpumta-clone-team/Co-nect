import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { handleFetcher } from 'utils';
import commentApi from 'api/comment';
import { getUserInfo } from 'service/auth';

import CommentList from './CommentList';
import CommentForm from './CommentForm';

CommentContainer.propTypes = {
  postType: PropTypes.string.isRequired,
  postWriter: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
};

export default function CommentContainer({ postType, postWriter, postId }) {
  const [comments, setComments] = useState([]);
  const [editTargetCommentId, setEditTargetCommentId] = useState(DEFAULT_TARGET);
  const userInfo = getUserInfo(); // {userId, name, profileImg}
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
      } = await handleFetcher(commentApi.POST_COMMENT, {
        postType,
        data: newCommentData,
      });
      if (isError) {
        console.log('error :>> ', error);
        return;
      }
      setComments(newComment);
      // setComments((prevComments) => addComment({ prevComments, newComment }));
    },
    [postType],
  );

  const addCommentOnNested = useCallback(
    async (newCommentData, commentId) => {
      const {
        error,
        isError,
        value: newComment,
      } = await handleFetcher(commentApi.POST_REPLY, {
        postType,
        data: newCommentData,
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
      } = await handleFetcher(commentApi.PATCH_COMMENT, {
        postType,
        id: commentId,
        data: newCommentData,
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
      } = await handleFetcher(commentApi.PATCH_REPLY, {
        postType,
        id: commentId,
        data: newCommentData,
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
      const { error, isError } = await handleFetcher(commentApi.DELETE_COMMENT, { postType, id });
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
    const { error, isError } = await handleFetcher(commentApi.PATCH_COMMENT_LIKE, { postType, id });
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
    const { error, isError } = await handleFetcher(commentApi.PATCH_COMMENT_UN_LIKE, {
      postType,
      id,
    });
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
    } = await handleFetcher(commentApi.GET_COMMENT, { postType, postId });
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
        userInfo={userInfo}
        initialText=""
        submitCallback={handlePostComment}
        commentInfo={{ id: null, parentId: null, secret: false }}
        hasCancelButton={false}
        hasDeleteButton={false}
        handleCancel={() => {}}
        handleClickDeleteButton={handleClickDeleteButton}
      />
      {!comments && comments?.length !== 0 ? (
        <div>댓글이 없어요.</div>
      ) : (
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
      )}
    </div>
  );
}

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
