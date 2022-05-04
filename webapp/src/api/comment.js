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
  POST_COMMENT_LIKE({ postType, id }) {
    return instance({
      url: `${MOCK_SERVER_URL}/${postType}/comment/liking/${id}`,
      method: 'post',
    });
  },

  DELETE_COMMENT({ postType, id }) {
    return instance({
      url: `${MOCK_SERVER_URL}/${postType}/comment/${id}`,
      method: 'delete',
    });
  },
  PATCH_COMMENT({ postType, id, data }) {
    return instance({
      url: `${MOCK_SERVER_URL}/${postType}/comment/${id}`,
      method: 'patch',
      data,
    });
  },
  POST_REPLY({ postType, data }) {
    return instance({
      url: `${MOCK_SERVER_URL}/${postType}/nested_comment`,
      method: 'post',
      data,
    });
  },
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
