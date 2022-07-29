/* eslint-disable react-hooks/exhaustive-deps */
import commentApi from 'api/comment';
import useAxios from 'hooks/useAxios';
import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useCommentApi from './useCommentApi';

const DEFAULT_TARGET = -1;

const useComments = () => {
  const location = useLocation();
  const [_, postType, postId] = location.pathname.split('/');
  const { comments, setComments, isLoading, apiError, changeApi, forceRefetch } = useCommentApi(
    'getComments',
    commentApi.GET_COMMENT,
    { postType, postId },
  );
  const [editTargetCommentId, setEditTargetCommentId] = useState(DEFAULT_TARGET);

  const postCommentApi = (config) => changeApi('postComments', commentApi.POST_COMMENT, config);
  const postReplyApi = (config) => changeApi('postReply', commentApi.POST_REPLY, config);
  const patchCommentApi = (config) => changeApi('postComments', commentApi.PATCH_COMMENT, config);
  const pathReplyApi = (config) => changeApi('pathReply', commentApi.PATCH_REPLY, config);
  const deleteCommentApi = (config) =>
    changeApi('deleteComment', commentApi.DELETE_COMMENT, config);

  const patchCommentLikeApi = (config) =>
    changeApi('deleteComment', commentApi.PATCH_COMMENT_LIKE, config);

  const patchCommentUnLikeApi = (config) =>
    changeApi('deleteComment', commentApi.DELETE_COMMENT, config);

  const addLike = async (postType, idObj) => {
    const { id, loggedInUserId, parentId } = idObj;
    await patchCommentLikeApi({
      postType,
      id,
    });
    if (parentId) {
      const callbackParams = { id, loggedInUserId };
      setComments((prev) =>
        findParentAndDoCallback(prev, parentId, addLikeToComment, callbackParams),
      );
    } else {
      setComments((prevComments) => addLikeToComment({ prevComments, id, loggedInUserId }));
    }
  };

  const removeLike = async (postType, idObj) => {
    const { id, loggedInUserId, parentId } = idObj;
    await patchCommentUnLikeApi({
      postType,
      id,
    });
    if (parentId) {
      const callbackParams = { id, loggedInUserId };
      setComments((prev) =>
        findParentAndDoCallback(prev, parentId, removeLikeToComment, callbackParams),
      );
    } else {
      setComments((prevComments) => removeLikeToComment({ prevComments, id, loggedInUserId }));
    }
  };

  const handleClickLikeThumb = async (isLikesContainUserId, postType, idObj) => {
    if (isLikesContainUserId) {
      removeLike(postType, idObj);
    } else {
      addLike(postType, idObj);
    }
  };

  const selectEditTargetComment = (commentId) => {
    setEditTargetCommentId(commentId);
  };

  const resetTarget = () => {
    setEditTargetCommentId(DEFAULT_TARGET);
  };

  const actions = useMemo(
    () => ({
      selectEditTargetComment,
      resetTarget,
      postCommentApi,
      postReplyApi,
      patchCommentApi,
      pathReplyApi,
      deleteCommentApi,
      handleClickLikeThumb,
    }),
    [
      deleteCommentApi,
      patchCommentApi,
      pathReplyApi,
      postCommentApi,
      postReplyApi,
      handleClickLikeThumb,
    ],
  );
  const states = useMemo(
    () => ({ postType, postId, comments, editTargetCommentId }),
    [postType, postId, comments, editTargetCommentId],
  );
  return [states, actions];
};

export default useComments;

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
