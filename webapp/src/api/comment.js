import { API } from 'constant/api';
import rootApiInstance from './core/rootApiInstance';

const commentApi = {
  GET_COMMENT({ postType, postId }) {
    return rootApiInstance({
      url: `/${postType + API.COMMENT.ORIGIN}/${postId}`,
      method: 'get',
    });
  },
  POST_COMMENT({ postType, data }) {
    return rootApiInstance({
      url: `/${postType + API.COMMENT.ORIGIN}`,
      method: 'post',
      data,
    });
  },
  DELETE_COMMENT({ postType, id }) {
    return rootApiInstance({
      url: `/${postType + API.COMMENT.ORIGIN}/${id}`,
      method: 'delete',
    });
  },
  PATCH_COMMENT({ postType, id, data }) {
    return rootApiInstance({
      url: `/${postType + API.COMMENT.ORIGIN}/${id}`,
      method: 'patch',
      data,
    });
  },
  POST_REPLY({ postType, data }) {
    return rootApiInstance({
      url: `/${postType + API.COMMENT.NESTED}`,
      method: 'post',
      data,
    });
  },
  DELETE_REPLY({ postType, id }) {
    return rootApiInstance({
      url: `/${postType + API.COMMENT.NESTED}/${id}`,
      method: 'delete',
    });
  },
  PATCH_REPLY({ postType, id, data }) {
    return rootApiInstance({
      url: `/${postType + API.COMMENT.NESTED}/${id}`,
      method: 'patch',
      data,
    });
  },
  PATCH_COMMENT_LIKE({ postType, id }) {
    return rootApiInstance({
      url: `/${postType + API.COMMENT.LIKE}/${id}`,
      method: 'patch',
    });
  },
  PATCH_COMMENT_UN_LIKE({ postType, id }) {
    return rootApiInstance({
      url: `/${postType + API.COMMENT.UNLIKE}/${id}`,
      method: 'patch',
    });
  },
};

export default commentApi;
