import { GET_USER__ARR, GET_USER_DETAIL, PATCH_USER_LIKE } from '_types/userTypes';

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

export async function actionPatchUserLike(responseData) {
  return {
    type: PATCH_USER_LIKE,
    payload: responseData,
  };
}
