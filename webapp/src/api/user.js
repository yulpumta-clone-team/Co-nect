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
  POST_USER_COMMENT(data) {
    return instance({
      url: '/user/comment',
      method: 'post',
      data,
    });
  },
  POST_USER_REPLY(data) {
    return instance({
      url: '/user/nested_comment',
      method: 'post',
      data,
    });
  },
  DELETE_USER_COMMENT({ comment_id }) {
    return instance({
      url: '/user/comment',
      method: 'delete',
      params: { comment_id },
    });
  },
  // DELETE_USER_REPLY() {
  //   return instance({
  //     url: '/user/logout',
  //   });
  // },
  PATCH_USER_LIKE({ user_id }) {
    return instance({
      url: '/user/liking',
      method: 'patch',
      params: { user_id },
    });
  },
  // PATCH_USER_LIKE_LIKE({ user_id }) {
  //   return instance({
  //     url: '/user/liking',
  //     method: 'patch',
  //     params: { user_id },
  //   });
  // },
  PATCH_USER_COMMENT(data) {
    return instance({
      url: '/user/comment',
      method: 'patch',
      data,
    });
  },
  PATCH_USER_REPLY(data) {
    return instance({
      url: '/user/nested_comment',
      method: 'patch',
      data,
    });
  },
  // HANDLE_SECRET_USER_REPLY() {
  //   return instance({
  //     url: '/user/logout',
  //   });
  // },
  // HANDLE_SECRET_USER_COMMENT() {
  //   return instance({
  //     url: '/user/logout',
  //   });
  // },
};

export default userApi;
