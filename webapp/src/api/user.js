import instance from './core';

const userApi = {
  GET_USER_LIST({ page }) {
    return instance({
      url: `/users`,
      method: 'get',
      params: { page },
    });
  },
  GET_USER_DETAIL({ id }) {
    return instance({
      url: `/user/${id}`,
      method: 'get',
    });
  },
  EDIT_USER_PROFILE({ data }) {
    return instance({
      url: `/user/myprofile`,
      method: 'patch',
      data,
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
