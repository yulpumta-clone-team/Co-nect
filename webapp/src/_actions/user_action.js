import {
  GET_USER__ARR,
  GET_USER_DETAIL,
  PATCH_USER_LIKE,
  PATCH_USER_PROFILE,
} from '_types/userTypes';

export async function actionGetUserDetail(responseData) {
  const {
    data: { data },
  } = responseData;
  return {
    type: GET_USER_DETAIL,
    payload: data,
  };
}

export async function actionGetUserList(responseData) {
  const {
    data: { data },
  } = responseData;
  return {
    type: GET_USER__ARR,
    payload: data,
  };
}

export async function actionPatchUserProfile(responseData) {
  return {
    type: PATCH_USER_PROFILE,
    payload: responseData,
  };
}

export async function actionPatchUserLike(responseData) {
  return {
    type: PATCH_USER_LIKE,
    payload: responseData,
  };
}
