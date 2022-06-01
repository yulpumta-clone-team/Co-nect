import { AUTH, LOGIN_USER, SIGNUP_USER } from '_types/authType';

export function actionLogin(responseData) {
  const { data } = responseData;
  const { data: userInfo } = data;
  return {
    type: LOGIN_USER,
    payload: responseData,
  };
}

export function actionSignUp(responseData) {
  return {
    type: SIGNUP_USER,
    payload: responseData,
  };
}

export function checkUserInfo(userInfo) {
  return {
    type: AUTH,
    payload: userInfo,
  };
}
