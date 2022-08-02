/* eslint-disable react-hooks/exhaustive-deps */
import commentApi from 'api/comment';
import { useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserInfo } from 'service/auth';
import useCommentApi from './useCommentApi';

const DEFAULT_TARGET = -1;

const useComments = () => {
  // 로그인 유저 정보
  const userInfo = getUserInfo(); // {userId, name, profileImg}
  const loggedInUserId = userInfo?.userId;

  const location = useLocation();
  const [_, postType, postId] = location.pathname.split('/');

  // api관련 로직
  const { comments, setComments, isLoading, apiError, changeApi, forceRefetch } = useCommentApi(
    'getComments',
    commentApi.GET_COMMENT,
    { postType, postId },
  );
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

  // useState관련 로직
  const [targetReplyListId, setTargetReplyListId] = useState(DEFAULT_TARGET);
  const [editTargetCommentId, setEditTargetCommentId] = useState(DEFAULT_TARGET);
  const [createReplyTargetCommentId, setCreateReplyTargetCommentId] = useState(DEFAULT_TARGET);

  // setState관련 로직
  const showReplyList = (commentId) => setTargetReplyListId(commentId);
  const resetShowReplyList = () => setTargetReplyListId(DEFAULT_TARGET);
  const selectEditTargetComment = (commentId) => setEditTargetCommentId(commentId);
  const resetEditTargetCommentId = () => setEditTargetCommentId(DEFAULT_TARGET);
  const showCreateReplyFormOnTargetComment = (commentId) =>
    setCreateReplyTargetCommentId(commentId);
  const resetCreateReplyTargetCommentId = () => setCreateReplyTargetCommentId(DEFAULT_TARGET);

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

  const checkSecretComment = (postWriterName, commentWriterName, loggedInUserName) => {
    // true: 가리기 , false: 보여주기
    if (!loggedInUserName) {
      return true;
    }
    const isSameCommentWriter = postWriterName === loggedInUserName;
    const isSamePostWriter = commentWriterName === loggedInUserName;
    if (isSameCommentWriter || isSamePostWriter) {
      return false;
    }

    return true;
  };

  const isShowSecretComment = (secret, postWriterName, commentWriterName, loggedInUserName) => {
    // secret ? 가리기 : 보여주기
    if (secret) {
      const isShow = checkSecretComment(postWriterName, commentWriterName, loggedInUserName);
      return isShow;
    }
    return false;
  };

  const checkUserLikeTarget = useCallback((userId, targetLikesArray) => {
    const findUser = targetLikesArray.find((id) => id === userId);
    return !!findUser;
  }, []);

  const isLikesContainUserId = (likedUserIds) => checkUserLikeTarget(loggedInUserId, likedUserIds);

  const actions = useMemo(
    () => ({
      forceRefetch,
      showReplyList,
      resetShowReplyList,
      showCreateReplyFormOnTargetComment,
      selectEditTargetComment,
      resetEditTargetCommentId,
      resetCreateReplyTargetCommentId,
      postCommentApi,
      postReplyApi,
      patchCommentApi,
      pathReplyApi,
      deleteCommentApi,
      handleClickLikeThumb,
      isShowSecretComment,
      isLikesContainUserId,
    }),
    [
      forceRefetch,
      showReplyList,
      resetShowReplyList,
      resetCreateReplyTargetCommentId,
      showCreateReplyFormOnTargetComment,
      deleteCommentApi,
      patchCommentApi,
      pathReplyApi,
      postCommentApi,
      postReplyApi,
      handleClickLikeThumb,
      isShowSecretComment,
      isLikesContainUserId,
    ],
  );
  const states = useMemo(
    () => ({
      isLoading,
      apiError,
      userInfo,
      postType,
      postId,
      comments,
      editTargetCommentId,
      createReplyTargetCommentId,
      targetReplyListId,
    }),
    [
      isLoading,
      apiError,
      userInfo,
      postType,
      postId,
      comments,
      editTargetCommentId,
      createReplyTargetCommentId,
      targetReplyListId,
    ],
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
