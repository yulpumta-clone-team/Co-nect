import { API } from 'constant/api';
import instance from './core';

const commentApi = {
  GET_COMMENT({ postType, postId }) {
    return instance({
      url: `/${postType + API.COMMENT.ORIGIN}/${postId}`,
      method: 'get',
    });
  },
  POST_COMMENT({ postType, data }) {
    return instance({
      url: `/${postType + API.COMMENT.ORIGIN}`,
      method: 'post',
      data,
    });
  },
  DELETE_COMMENT({ postType, id }) {
    return instance({
      url: `/${postType + API.COMMENT.ORIGIN}/${id}`,
      method: 'delete',
    });
  },
  PATCH_COMMENT({ postType, id, data }) {
    return instance({
      url: `/${postType + API.COMMENT.ORIGIN}/${id}`,
      method: 'patch',
      data,
    });
  },
  POST_REPLY({ postType, data }) {
    return instance({
      url: `/${postType + API.COMMENT.NESTED}`,
      method: 'post',
      data,
    });
  },
  PATCH_REPLY({ postType, id, data }) {
    return instance({
      url: `/${postType + API.COMMENT.NESTED}/${id}`,
      method: 'patch',
      data,
    });
  },
  PATCH_COMMENT_LIKE({ postType, id }) {
    return instance({
      url: `/${postType + API.COMMENT.LIKE}/${id}`,
      method: 'patch',
    });
  },
  PATCH_COMMENT_UN_LIKE({ postType, id }) {
    return instance({
      url: `/${postType + API.COMMENT.UNLIKE}/${id}`,
      method: 'patch',
    });
  },
};

export default commentApi;
