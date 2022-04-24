import { MOCK_SERVER_URL } from 'constant/route';
import instance from './core';

const commentApi = {
  GET_COMMENT({ postType, postId }) {
    return instance({
      url: `${MOCK_SERVER_URL}/${postType}/comment/${postId}`,
      method: 'get',
    });
  },
  POST_COMMENT({ postType, data }) {
    return instance({
      url: `${MOCK_SERVER_URL}/${postType}/comment`,
      method: 'post',
      data,
    });
  },
  PATCH_COMMENT({ postType, postId, data }) {
    return instance({
      url: `${MOCK_SERVER_URL}/${postType}/comment/${postId}`,
      method: 'patch',
      data,
    });
  },
  // POST_REPLY({ postType, data }) {
  //   return instance({
  //     url: `/${postType}/nested_comment`,
  //     method: 'post',
  //     data,
  //   });
  // },
  // DELETE_COMMENT({ postType, comment_id }) {
  //   return instance({
  //     url: `/${postType}/comment`,
  //     method: 'delete',
  //     params: { comment_id },
  //   });
  // },
  // DELETE_REPLY() {
  //   return instance({
  //     url: '/user/logout',
  //   });
  // },
  // PATCH_LIKE({ user_id }) {
  //   return instance({
  //     url: '/user/liking',
  //     method: 'patch',
  //     params: { user_id },
  //   });
  // },
  // PATCH_COMMENT_LIKE({ user_id }) {
  //   return instance({
  //     url: '/user/liking',
  //     method: 'patch',
  //     params: { user_id },
  //   });
  // },
  // PATCH_USER_REPLY({ postType, data }) {
  //   return instance({
  //     url: '/user/nested_comment',
  //     method: 'patch',
  //     data,
  //   });
  // },
  // HANDLE_SECRET_USER_REPLY() {
  //   return instance({
  //     url: '/user/logout',
  //   });
  // },
  // HANDLE_SECRET_COMMENT() {
  //   return instance({
  //     url: '/user/logout',
  //   });
  // },
};

export default commentApi;
