import { API } from 'constant/api';
import instance from './core';

const userApi = {
  GET_USER_LIST(config) {
    return instance({
      url: API.USER.INDEX,
      method: 'get',
      ...config,
    });
  },
  GET_USER_DETAIL({ id }) {
    return instance({
      url: `${API.USER.INDEX}/${id}`,
      method: 'get',
    });
  },
  GET_USER_LIKES() {
    return instance({
      url: API.USER.LIKES,
      method: 'get',
    });
  },
  GET_USER_READS() {
    return instance({
      url: API.USER.READS,
      method: 'get',
    });
  },
  GET_MY_POSTS() {
    return instance({
      url: API.USER.MYPOSTS,
      method: 'get',
    });
  },
  EDIT_USER_PROFILE({ data }) {
    return instance({
      url: API.USER.PROFILE,
      method: 'patch',
      data,
    });
  },
};

export default userApi;
