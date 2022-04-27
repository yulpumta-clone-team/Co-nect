import {
  GET_TEAM_DETAIL,
  GET_TEAM__ARR,
  POST_TEAM_COMMENT,
  HANDLE_SECRET_TEAM_COMMENT,
  DELETE_TEAM_COMMENT,
  PATCH_TEAM_COMMENT,
  POST_TEAM_REPLY,
  DELETE_TEAM_REPLY,
  PATCH_TEAM_REPLY,
  HANDLE_SECRET_TEAM_REPLY,
  PATCH_TEAM_LIKE,
  PATCH_TEAM_COMMENT_LIKE,
  POST_TEAM_POST,
} from '_types/teamTypes';

export async function actionGetTeamDetail(responseData) {
  return {
    type: GET_TEAM_DETAIL,
    payload: responseData,
  };
}

export async function actionGetTeamList(responseData) {
  return {
    type: GET_TEAM__ARR,
    payload: responseData,
  };
}

export async function actionPostTeamPost(responseData) {
  return {
    type: POST_TEAM_POST,
    payload: responseData,
  };
}

export async function actionPostTeamComment(responseData) {
  return {
    type: POST_TEAM_COMMENT,
    payload: responseData,
  };
}

export async function actionPostTeamReply(responseData) {
  return {
    type: POST_TEAM_REPLY,
    payload: responseData,
  };
}

export async function actionDeleteTeamReply(responseData) {
  return {
    type: DELETE_TEAM_REPLY,
    payload: responseData,
  };
}

export async function actionDeleteTeamComment(responseData) {
  return {
    type: DELETE_TEAM_COMMENT,
    payload: responseData,
  };
}

export async function actionPatchTeamReply(responseData) {
  return {
    type: PATCH_TEAM_REPLY,
    payload: responseData,
  };
}

export async function actionPatchTeamLike(responseData) {
  return {
    type: PATCH_TEAM_LIKE,
    payload: responseData,
  };
}

export async function actionPatchTeamComment(responseData) {
  return {
    type: PATCH_TEAM_COMMENT,
    payload: responseData,
  };
}

export async function actionPatchTeamCommentLike(responseData) {
  return {
    type: PATCH_TEAM_COMMENT_LIKE,
    payload: responseData,
  };
}

export async function actionSecretTeamComment(responseData) {
  return {
    type: HANDLE_SECRET_TEAM_COMMENT,
    payload: responseData,
  };
}

export async function actionSecretTeamReply(responseData) {
  return {
    type: HANDLE_SECRET_TEAM_REPLY,
    payload: responseData,
  };
}
