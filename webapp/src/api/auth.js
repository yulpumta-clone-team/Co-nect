import { API } from 'constant/api';
import rootApiInstance from './core/rootApiInstance';

const authApi = {
  POST_LOGIN(data) {
    return rootApiInstance({
      url: API.AUTH.LOGIN,
      method: 'post',
      data,
    });
  },
  POST_ESSENTIAL_INFO(data) {
    return rootApiInstance({
      url: API.AUTH.ESSENTIAL_INFO,
      method: 'post',
      data,
    });
  },
  GET_ESSENTIAL_INFO(config) {
    return rootApiInstance({
      url: API.AUTH.ESSENTIAL_INFO,
      method: 'get',
      ...config,
    });
  },
  POST_SIGN_UP(data) {
    return rootApiInstance({
      url: API.AUTH.SIGNUP,
      method: 'post',
      data,
    });
  },
  GET_LOG_OUT() {
    return rootApiInstance({
      url: API.AUTH.LOGOUT,
      method: 'get',
    });
  },
  DEL_WITHDRAWAL() {
    return rootApiInstance({
      url: API.AUTH.WITHDRAWAL,
      method: 'delete',
    });
  },
};

export default authApi;
