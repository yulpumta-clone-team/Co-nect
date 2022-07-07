import { API } from 'constant/api';
import instance from './core';

const authApi = {
  POST_LOGIN(data) {
    return instance({
      url: API.AUTH.LOGIN,
      method: 'post',
      data,
    });
  },
  POST_SIGN_UP(data) {
    return instance({
      url: API.AUTH.SIGNUP,
      method: 'post',
      data,
    });
  },
  GET_LOG_OUT() {
    return instance({
      url: API.AUTH.LOGOUT,
      method: 'get',
    });
  },
  DEL_WITHDRAWAL() {
    return instance({
      url: API.AUTH.WITHDRAWAL,
      method: 'delete',
    });
  },
};

export default authApi;
