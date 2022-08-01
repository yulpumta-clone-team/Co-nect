import { API } from 'constant/api';
import rootApiInstance from './core';

const userApi = {
  GET_USER_LIST(config) {
    return rootApiInstance({
      url: API.USER.INDEX,
      method: 'get',
      ...config,
    });
  },
  GET_USER_DETAIL({ id }) {
    return rootApiInstance({
      url: `${API.USER.INDEX}/${id}`,
      method: 'get',
    });
  },
  GET_USER_LIKES() {
    return rootApiInstance({
      url: API.USER.LIKES,
      method: 'get',
    });
  },
  GET_USER_READS() {
    return rootApiInstance({
      url: API.USER.READS,
      method: 'get',
    });
  },
  GET_MY_POSTS() {
    return rootApiInstance({
      url: API.USER.MYPOSTS,
      method: 'get',
    });
  },
  EDIT_USER_PROFILE({ data }) {
    return rootApiInstance({
      url: API.USER.PROFILE,
      method: 'patch',
      data,
    });
  },
};

export default userApi;
