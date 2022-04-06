import {
  GET_USER__ARR,
  GET_USER_DETAIL,
  POST_USER_COMMENT,
  POST_USER_REPLY,
  DELETE_USER_COMMENT,
  DELETE_USER_REPLY,
  PATCH_USER_COMMENT,
  PATCH_USER_REPLY,
  HANDLE_SECRET_USER_REPLY,
  HANDLE_SECRET_USER_COMMENT,
  PATCH_USER_LIKE,
  PATCH_USER_COMMENT_LIKE,
} from '_types/userTypes';

export async function actionGetUserDetail(responseData) {
  const { data } = responseData;
  return {
    // request변수로 받은 data를 reducer로 넘겨주기
    type: GET_USER_DETAIL,
    payload: data,
  };
}

export async function actionGetUserList(responseData) {
  console.log(responseData);
  const { data } = responseData;
  return {
    type: GET_USER__ARR,
    payload: [],
  };
}

export async function actionPostUserComment(responseData) {
  return {
    type: POST_USER_COMMENT,
    payload: responseData,
  };
}

export async function actionPostUserReply(responseData) {
  return {
    type: POST_USER_REPLY,
    payload: responseData,
  };
}

export async function actionDeleteUserReply(responseData) {
  return {
    type: DELETE_USER_REPLY,
    payload: responseData,
  };
}

export async function actionDeleteUserComment(responseData) {
  const { id } = responseData;
  return {
    type: DELETE_USER_COMMENT,
    payload: id,
  };
}

export async function actionPatchUserReply(responseData) {
  return {
    type: PATCH_USER_REPLY,
    payload: responseData,
  };
}

export async function actionPatchUserLike(responseData) {
  return {
    type: PATCH_USER_LIKE,
    payload: responseData,
  };
}

export async function actionPatchUserCommentLike(responseData) {
  return {
    type: PATCH_USER_COMMENT_LIKE,
    payload: responseData,
  };
}

export async function actionPatchUserComment(responseData) {
  return {
    type: PATCH_USER_COMMENT,
    payload: responseData,
  };
}

export async function actionSecretUserComment(responseData) {
  return {
    type: HANDLE_SECRET_USER_COMMENT,
    payload: responseData,
  };
}

export async function actionSecretUserReply(responseData) {
  return {
    type: HANDLE_SECRET_USER_REPLY,
    payload: responseData,
  };
}
