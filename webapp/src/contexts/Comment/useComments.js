/* eslint-disable react-hooks/exhaustive-deps */
import commentApi from 'api/comment.api';
import { useToastNotificationAction } from 'contexts/ToastNotification';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserInfo } from 'service/auth';
import {
  addLikeToComment,
  findParentAndDoCallback,
  removeLikeToComment,
} from 'service/etc/comment.util';
import { setPostIdOnSubmitData } from 'utils';
import useCommentApi from './useCommentApi';

const DEFAULT_TARGET = -1;
const DEFAULT_PARENT_ID = 0; // 원본 댓글일 경우 0으로 고정

const useComments = () => {
  // 로그인 유저 정보
  const userInfo = getUserInfo(); // {id, nickname, profileImg}
  const loggedInUserId = userInfo?.id;
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
    changeApi('patchCommentUnLikeApi', commentApi.PATCH_COMMENT_UN_LIKE, config); // : DELETE_COMMENT_UNLIKE가 아닌가요 ?

  // useState관련 로직
  const [targetReplyListId, setTargetReplyListId] = useState(DEFAULT_PARENT_ID); // 답글을 보여주는 원본댓글의 id
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
      parentId: DEFAULT_PARENT_ID,
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
      secret: isSecret,
      parentId: createReplyTargetCommentId,
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
      parentId: targetReplyListId, // 원본 댓글일 경우 0으로 고정
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
    deleteCommentApi(config);
  };

  const addLike = async (postType, commentId, parentId) => {
    await patchCommentLikeApi({
      postType,
      id: commentId,
    });
    if (parentId) {
      const callbackParams = { commentId, loggedInUserId };
      setComments((prev) =>
        findParentAndDoCallback(prev, parentId, addLikeToComment, callbackParams),
      );
    } else {
      setComments((prevComments) => addLikeToComment({ prevComments, commentId, loggedInUserId }));
    }
  };

  const removeLike = async (postType, commentId, parentId) => {
    await patchCommentUnLikeApi({
      postType,
      id: commentId,
    });
    if (parentId) {
      const callbackParams = { commentId, loggedInUserId };
      setComments((prev) =>
        findParentAndDoCallback(prev, parentId, removeLikeToComment, callbackParams),
      );
    } else {
      setComments((prevComments) =>
        removeLikeToComment({ prevComments, commentId, loggedInUserId }),
      );
    }
  };

  /**
   * 특정 댓글의 좋아요 누른 유저Id배열에 로그인한 유저의 id가 포함되어있는지 확인하는 함수
   * @typedef {Object} UserId
   * @property {number} userId
   *
   * @param {UserId[]} likedUserIds 삭제하고자 하는 댓글의 종아요 누른 유저객체 배열
   * @returns {boolean} 포함되어있으면 true 아니면 false
   */
  const isLikedUserIdsContainLoggnedInUserId = (likedUserIds) => {
    const findUser = likedUserIds.find((user) => user.userId === loggedInUserId);
    return !!findUser;
  };

  /**
   * 좋아요 svg를 눌렀을 때 동작하는 함수(likedUserIds에 로그인한 유저의 id가 포함되어있으면 제거요청 아니면 등록요청)
   * @param {Array} likedUserIds 삭제하고자 하는 댓글의 종아요 누른 유저id 배열
   * @param {number} commentId 삭제하고자 하는 댓글의 id
   * @param {number} parentId 삭제하고자 하는 댓글의 부모 id
   */
  const handleClickLikeThumb = async (likedUserIds, commentId, parentId) => {
    if (isLikedUserIdsContainLoggnedInUserId(likedUserIds)) {
      removeLike(postType, commentId, parentId);
    } else {
      addLike(postType, commentId, parentId);
    }
  };

  /**
   * 로그인한 유저가 쓴 댓글인지
   * @param {number} commentWriterId 댓글 작성자의 id
   * @returns 유저가 로그인을 했고 로그인한 유저가 작성자면 true반환
   */
  const isCommentLoginUserWrote = (commentWriterId) => {
    if (loggedInUserId) return false;
    return commentWriterId === loggedInUserId;
  };

  /**
   * 게시글 작성자, 댓글 작성자만 비밀댓글을 볼 수 있게 하는 함수
   * @param {number} postWriterId 포스트 작성자의 id
   * @param {number} commentWriterId 댓글 작성자의 id
   * @param {number} loggedInUserId 로그인한 유저의 Id
   * @returns {boolean} true = 비밀댓글 보이기, false = 비밀댓글 가리기
   */
  const checkCanShowSecretComment = (postWriterId, commentWriterId, loggedInUserId) => {
    const isSameCommentWriter = isCommentLoginUserWrote(commentWriterId);
    const isSamePostWriter = postWriterId === loggedInUserId;
    if (isSameCommentWriter || isSamePostWriter) return true;
    return false;
  };

  /**
   * 비밀댓글일 경우 특정 조건(checkCanShowSecretComment)에 의해서만 보여지게하는 함수
   * @param {boolean} isSecret
   * @param {number} postWriterId 포스트 작성자의 id
   * @param {number} commentWriterId 댓글 작성자의 id
   * @param {number} loggedInUserId 로그인한 유저의 Id
   * @returns {boolean} true = 비밀댓글 보이기, false = 비밀댓글 가리기
   */
  const isShowSecretComment = (isSecret, postWriterId, commentWriterId) => {
    if (isSecret) {
      const isShow = checkCanShowSecretComment(postWriterId, commentWriterId, loggedInUserId);
      return isShow;
    }
    return true;
  };

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
      isLikedUserIdsContainLoggnedInUserId,
      isCommentLoginUserWrote,
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
      isLikedUserIdsContainLoggnedInUserId,
      isCommentLoginUserWrote,
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
