import { API } from 'constant/api';
import privateApiInstance from './core/privateApiInstance';
import publicApiInstance from './core/publicApiInstance';

const userApi = {
  POST_ESSENTIAL_INFO(data) {
    return privateApiInstance({
      url: API.USER.ESSENTIAL_INFO,
      method: 'post',
      data,
    });
  },
  GET_ESSENTIAL_INFO() {
    return privateApiInstance({
      url: API.USER.ESSENTIAL_INFO,
      method: 'get',
    });
  },
  GET_USER_LIST(config) {
    return publicApiInstance({
      url: API.USER.INDEX,
      method: 'get',
      ...config,
    });
  },
  GET_USER_DETAIL({ id }) {
    return publicApiInstance({
      url: `${API.USER.INDEX}/${id}`,
      method: 'get',
    });
  },
  GET_USER_LIKES() {
    return publicApiInstance({
      url: API.USER.LIKES,
      method: 'get',
    });
  },
  GET_USER_READS() {
    return publicApiInstance({
      url: API.USER.READS,
      method: 'get',
    });
  },
  GET_MY_POSTS() {
    return publicApiInstance({
      url: API.USER.MYPOSTS,
      method: 'get',
    });
  },
  EDIT_USER_PROFILE({ data }) {
    return privateApiInstance({
      url: API.USER.PROFILE,
      method: 'patch',
      data,
    });
  },
};

export default userApi;
