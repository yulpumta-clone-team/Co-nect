import userApi from 'api/user';
import dayjs from 'dayjs';
import uuid from 'react-uuid';
import { catchError } from '_actions/global_action';
import {
  actionPostUserComment,
  actionGetUserDetail,
  actionGetUserList,
  actionPatchUserComment,
  actionSecretUserComment,
  actionPostUserReply,
  actionDeleteUserReply,
  actionPatchUserReply,
  actionSecretUserReply,
  actionPatchUserLike,
  actionPatchUserCommentLike,
} from '_actions/user_action';

export function getUserList({ page }) {
  return (dispatch) => {
    return userApi
      .GET_USER_LIST({ page })
      .then((response) => dispatch(actionGetUserList(response)))
      .catch((error) => dispatch(catchError(error)));
  };
}

export function getUserDetail({ id }) {
  return (dispatch) => {
    console.log('UserDetail ID: ', id);
    return userApi
      .GET_USER_DETAIL({ id })
      .then((response) => dispatch(actionGetUserDetail(response)))
      .catch((error) => dispatch(catchError(error)));
  };
}

export function postUserComment(dataToSubmit) {
  return (dispatch) => {
    const { user_id, writter_id, nickname, content, isSecret } = dataToSubmit;
    const newCommentCreateAt = dayjs().format('YYYY-MM-DD HH:mm:ss.ssssss');
    const newCommentId = uuid();
    const newComment = {
      ...commentObj,
      writter_id,
      id: newCommentId,
      nickname,
      content,
      isSecret,
      createdAt: newCommentCreateAt,
      updatedAt: newCommentCreateAt,
    };
    return dispatch(actionPostUserComment(newComment));
    // return userApi
    //   .POST_USER_COMMENT(newComment)
    //   .then((response) => dispatch(actionPostUserComment(response)))
    //   .catch((error) => dispatch(catchError(error)));
  };
}

export function postUserReply(dataToSubmit) {
  return (dispatch) => {
    const { postId: user_id, parent_id, nickname, content, writter_id } = dataToSubmit;
    const newCommentCreateAt = dayjs().format('YYYY-MM-DD HH:mm:ss.ssssss');
    const newCommentId = uuid();
    const newComment = {
      ...commentObj,
      user_id,
      parent_id,
      id: newCommentId,
      writter_id,
      nickname,
      content,
      createdAt: newCommentCreateAt,
      updatedAt: newCommentCreateAt,
    };
    return dispatch(actionPostUserReply(newComment));
    // return userApi
    //   .POST_USER_COMMENT(newComment)
    //   .then((response) => dispatch(actionPostUserComment(response)))
    //   .catch((error) => dispatch(catchError(error)));
  };
}

export function deleteUserComment(dataToSubmit) {
  return (dispatch) => {
    const { postId: user_id, id } = dataToSubmit;
    return dispatch(actionDeleteUserReply(dataToSubmit));
    // return userApi
    //   .POST_USER_COMMENT(newComment)
    //   .then((response) => dispatch(actionPostUserComment(response)))
    //   .catch((error) => dispatch(catchError(error)));
  };
}

export function deleteUserReply(dataToSubmit) {
  return (dispatch) => {
    const { id, postId, parent_id } = dataToSubmit;
    return dispatch(actionDeleteUserReply(dataToSubmit));
    // return userApi
    //   .POST_USER_COMMENT(newComment)
    //   .then((response) => dispatch(actionPostUserComment(response)))
    //   .catch((error) => dispatch(catchError(error)));
  };
}

export function patchUserComment(dataToSubmit) {
  return (dispatch) => {
    const updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss.ssssss');
    const { postId: user_id, id, editContent, comment } = dataToSubmit;
    const editiedComment = {
      ...comment,
      id,
      user_id,
      content: editContent,
      updatedAt,
    };
    return dispatch(actionPatchUserComment(editiedComment));
    // return PATCH_USER_COMMENT
    //   .POST_USER_COMMENT(newComment)
    //   .then((response) => dispatch(actionPostUserComment(response)))
    //   .catch((error) => dispatch(catchError(error)));
  };
}

export function patchUserlike({ teamId }) {
  return (dispatch) => {
    return userApi
      .PATCH_USER_LIKE({ team_id: teamId })
      .then((response) => dispatch(actionPatchUserLike(response)))
      .catch((error) => dispatch(catchError(error)));
  };
}

// export function patchUserCommentlike({ teamId }) {
//   return (dispatch) => {
//     return userApi
//       .PATCH_USER_LIKE({ team_id: teamId })
//       .then((response) => dispatch(actionPatchUserCommentLike(response)))
//       .catch((error) => dispatch(catchError(error)));
//   };
// }

export function patchUserReply(dataToSubmit) {
  return (dispatch) => {
    const updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss.ssssss');
    const { id, postId: user_id, parent_id, editContent, comment } = dataToSubmit;
    const editiedComment = {
      ...comment,
      id,
      parent_id,
      user_id,
      content: editContent,
      updatedAt,
    };
    return dispatch(actionPatchUserReply(editiedComment));
    // return userApi
    //   .PATCH_USER_REPLY(newComment)
    //   .then((response) => dispatch(actionPostUserComment(response)))
    //   .catch((error) => dispatch(catchError(error)));
  };
}
export function handleSecretUserReply(dataToSubmit) {
  return (dispatch) => {
    const updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss.ssssss');
    return dispatch(actionSecretUserReply({ ...dataToSubmit, updatedAt }));
    // return userApi
    //   .POST_USER_COMMENT(newComment)
    //   .then((response) => dispatch(actionPostUserComment(response)))
    //   .catch((error) => dispatch(catchError(error)));
  };
}

export function handleSecretUserComment(dataToSubmit) {
  return (dispatch) => {
    const updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss.ssssss');
    return dispatch(actionSecretUserComment({ ...dataToSubmit, updatedAt }));
    // return userApi
    //   .POST_USER_COMMENT(newComment)
    //   .then((response) => dispatch(actionPostUserComment(response)))
    //   .catch((error) => dispatch(catchError(error)));
  };
}

const commentObj = {
  user_id: null,
  id: null,
  writter_id: null,
  users_like: [],
  nickname: null,
  isLike: false,
  content: null,
  img: 'https://user-images.githubusercontent.com/71386219/157435570-a48382a8-63e5-4d25-91f4-e506289424b5.png',
  createdAt: null,
  updatedAt: null,
  isSecret: false,
  replies: [],
};
