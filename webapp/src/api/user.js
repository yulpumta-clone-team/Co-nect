import instance from './core';

const userApi = {
  GET_USER_LIST({ page }) {
    return instance({
      url: '/user',
      method: 'get',
      params: { lastPage: page },
    });
  },
  GET_USER_DETAIL({ id }) {
    return instance({
      url: '/user/join',
      method: 'get',
      params: { id },
    });
  },
  GET_USER_LIKES() {
    return instance({
      url: '/user/liking',
      method: 'get',
    });
  },
};

export default userApi;
