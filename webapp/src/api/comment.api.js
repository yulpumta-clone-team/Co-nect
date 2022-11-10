import { API } from 'constant/api.constant';
import privateApiInstance from './instance/privateApiInstance';
import publicApiInstance from './instance/publicApiInstance';

const commentApi = {
  GET_COMMENT({ postType, postId }) {
    return publicApiInstance({
      url: `/${postType + API.COMMENT.ORIGIN}/${postId}`,
      method: 'get',
    });
  },
  POST_COMMENT({ postType, data }) {
    return privateApiInstance({
      url: `/${postType + API.COMMENT.ORIGIN}`,
      method: 'post',
      data,
    });
  },
  POST_REPLY({ postType, data }) {
    return privateApiInstance({
      url: `/${postType + API.COMMENT.NESTED}`,
      method: 'post',
      data,
    });
  },
  DELETE_COMMENT({ postType, id }) {
    return privateApiInstance({
      url: `/${postType + API.COMMENT.ORIGIN}/${id}`,
      method: 'delete',
    });
  },
  PATCH_COMMENT({ postType, id, data }) {
    return privateApiInstance({
      url: `/${postType + API.COMMENT.ORIGIN}/${id}`,
      method: 'patch',
      data,
    });
  },
  PATCH_COMMENT_LIKE({ postType, id }) {
    return privateApiInstance({
      url: `/${postType + API.COMMENT.LIKE}/${id}`,
      method: 'patch',
    });
  },
  PATCH_COMMENT_UN_LIKE({ postType, id }) {
    return privateApiInstance({
      url: `/${postType + API.COMMENT.UNLIKE}/${id}`,
      method: 'delete',
    });
  },
};

export default commentApi;
