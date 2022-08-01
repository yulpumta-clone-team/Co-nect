import { API } from 'constant/api';
import rootApiInstance from './core';

const teamApi = {
  GET_TEAM_ARR(config) {
    return rootApiInstance({
      url: API.TEAM.INDEX,
      method: 'get',
      ...config,
    });
  },
  GET_TEAM_DETAIL({ id }) {
    return rootApiInstance({
      url: `${API.TEAM.INDEX}/${id}`,
      method: 'get',
    });
  },
  GET_TEAM_LIKES() {
    return rootApiInstance({
      url: API.TEAM.LIKES,
      method: 'get',
    });
  },
  GET_TEAM_READS() {
    return rootApiInstance({
      url: API.TEAM.READS,
      method: 'get',
    });
  },
  POST_TEAM_POST({ data }) {
    return rootApiInstance({
      url: API.TEAM.DETAIL,
      method: 'post',
      data,
    });
  },
  EDIT_TEAM_POST({ id, data }) {
    return rootApiInstance({
      url: `${API.TEAM.DETAIL}/${id}`,
      method: 'patch',
      data,
    });
  },
};

export default teamApi;
