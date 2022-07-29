import commentApi from 'api/comment';
import useAxios from 'hooks/useAxios';
import { useMemo, useState } from 'react';

const DEFAULT_TARGET = -1;

const useComments = () => {
  const [comments, setComments] = useState([]);
  const [editTargetCommentId, setEditTargetCommentId] = useState(DEFAULT_TARGET);
  const [postCommentState, postCommentApi] = useAxios({
    axiosInstance: commentApi.POST_COMMENT,
    immediate: false,
  });

  const [postReplyState, postReplyApi] = useAxios({
    axiosInstance: commentApi.POST_COMMENT,
    immediate: false,
  });

  const [patchCommentState, patchCommentApi] = useAxios({
    axiosInstance: commentApi.PATCH_COMMENT,
    immediate: false,
  });

  const [pathCommentState, pathReplyApi] = useAxios({
    axiosInstance: commentApi.PATCH_REPLY,
    immediate: false,
  });

  const [deleteCommentState, deleteCommentApi] = useAxios({
    axiosInstance: commentApi.DELETE_COMMENT,
    immediate: false,
  });

  const [patchCommentLikeState, patchCommentLikeApi] = useAxios({
    axiosInstance: commentApi.PATCH_COMMENT_LIKE,
    immediate: false,
  });

  const [patchCommentUnLikeState, patchCommentUnLikeApi] = useAxios({
    axiosInstance: commentApi.PATCH_COMMENT_UN_LIKE,
    immediate: false,
  });

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    () => ({ comments, editTargetCommentId, postCommentState, postReplyState }),
    [, comments, editTargetCommentId, postCommentState, postReplyApi],
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
