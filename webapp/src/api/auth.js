import instance from './core';

const authApi = {
  POST_LOGIN(data) {
    return instance({
      url: '/user/login',
      method: 'post',
      data,
    });
  },
  POST_SIGN_UP(data) {
    return instance({
      url: '/user/join',
      method: 'post',
      data,
    });
  },
  GET_LOG_OUT() {
    return instance({
      url: '/user/logout',
    });
  },
  DEL_WITHDRAWAL() {
    return instance({
      url: '/user/withdrawal',
      method: 'delete',
    });
  },
};

export default authApi;
