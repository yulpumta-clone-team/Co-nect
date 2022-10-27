/* eslint-disable react-hooks/exhaustive-deps */
import commentApi from 'api/comment.api';
import { useToastNotificationAction } from 'contexts/ToastNotification';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import { useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserInfo } from 'service/auth';
import { setPostIdOnSubmitData } from 'utils';
import useCommentApi from './useCommentApi';

const DEFAULT_TARGET = -1;

const useComments = () => {
  // 로그인 유저 정보
  const userInfo = getUserInfo(); // {userId, nickname, profileImg}
  const loggedInUserId = userInfo?.userId;
  const loggedInUserNickname = userInfo?.nickname;

  // FIXME: 스토리북에서 url이 달라서 데이터 요청을 못하는 에러 수정해야합니다.
  // http://localhost:6006/?path=/story/category-createcommentform--default
  const location = useLocation();
  const [_, postType, postId] = location.pathname.split('/');

  const notifyDispatch = useToastNotificationAction();

  // api관련 로직
  const { comments, setComments, isLoading, apiError, changeApi, forceRefetch } = useCommentApi(
    'getComments',
    commentApi.GET_COMMENT,
    { postType, postId },
  );
  const postCommentApi = (config) => changeApi('postComments', commentApi.POST_COMMENT, config);
  const postReplyApi = (config) => changeApi('postReply', commentApi.POST_REPLY, config);
  const patchCommentApi = (config) => changeApi('patchComments', commentApi.PATCH_COMMENT, config);
  const deleteCommentApi = (config) =>
    changeApi('deleteComment', commentApi.DELETE_COMMENT, config);
  const patchCommentLikeApi = (config) =>
    changeApi('patchCommentLikeApi', commentApi.PATCH_COMMENT_LIKE, config);
  const patchCommentUnLikeApi = (config) =>
    changeApi('patchCommentUnLikeApi', commentApi.DELETE_COMMENT, config); // : DELETE_COMMENT_UNLIKE가 아닌가요 ?

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

  /**
   * 생성, 수정, 삭제 로직을 실행하기 전 공통적으로 실행해야하는 로직(ex: 로그인 여부)
   * @returns {boolean} submit로직을 실행할지 여부를 판단하는 로직
   */
  const checkExecuteSubmit = () => {
    if (!userInfo) {
      notifyNewMessage(notifyDispatch, '로그인을 먼저해주세요', TOAST_TYPE.Warning);
      return false;
    }
    return true;
  };

  /**
   * 댓글 작성 form에서 사용하는 submit handler
   * @param {Object} sumbitData form에서 제출할 데이터
   * @param {string} sumbitData.content 댓글 내용
   * @param {boolean} sumbitData.isSecret 비밀댓글 여부
   */
  const createRootCommentSubmitCallback = async ({ content, isSecret }) => {
    if (!checkExecuteSubmit) return;
    const newCommentData = setPostIdOnSubmitData(postType, postId, {
      writer: loggedInUserNickname,
      secret: isSecret,
      content,
    });
    await postCommentApi({ postType, data: newCommentData });
  };

  /**
   * 대댓글 작성 form에서 사용하는 submit handler
   * @param {Object} sumbitData form에서 제출할 데이터
   * @param {string} sumbitData.content 댓글 내용
   * @param {boolean} sumbitData.isSecret 비밀댓글 여부
   */
  const createReplyCommentSubmitCallback = async ({ content, isSecret }) => {
    if (!checkExecuteSubmit) return;
    const newCommentData = setPostIdOnSubmitData(postType, postId, {
      writer: loggedInUserNickname,
      secret: isSecret,
      content,
    });
    await postReplyApi({ postType, data: newCommentData });
  };

  /**
   * 댓글 수정 form에서 사용하는 submit handler
   * @param {Object} sumbitData form에서 제출할 데이터
   * @param {string} sumbitData.content 댓글 내용
   * @param {boolean} sumbitData.isSecret 비밀댓글 여부
   */
  const editCommentSubmitCallback = async ({ content, isSecret }) => {
    if (!checkExecuteSubmit) return;
    const newCommentData = setPostIdOnSubmitData(postType, postId, {
      writer: loggedInUserNickname,
      secret: isSecret,
      content,
    });
    await patchCommentApi({ postType, id: editTargetCommentId, data: newCommentData });
    resetEditTargetCommentId();
  };

  /**
   * (대)댓글 클릭하면 삭제하는 함수
   * @param {Object} config postType, id
   * @param {string} config.postType 현재 포스트의 타입(user || team)
   * @param {numner} config.id 선택한 댓글의 id
   */
  const handleClickDeleteTargetComment = (config) => {
    console.log('config', config);
    deleteCommentApi(config);
  };

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
      createRootCommentSubmitCallback,
      createReplyCommentSubmitCallback,
      editCommentSubmitCallback,
      handleClickDeleteTargetComment,
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
      handleClickDeleteTargetComment,
      createRootCommentSubmitCallback,
      createReplyCommentSubmitCallback,
      editCommentSubmitCallback,
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
