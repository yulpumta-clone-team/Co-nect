import { API } from 'constant/api';
import instance from './core';

const teamApi = {
  GET_TEAM_LIST(config) {
    return instance({
      url: API.TEAM.INDEX,
      method: 'get',
      ...config,
    });
  },
  GET_TEAM_DETAIL({ id }) {
    return instance({
      url: `${API.TEAM.INDEX}/${id}`,
      method: 'get',
    });
  },
  GET_TEAM_LIKES() {
    return instance({
      url: API.TEAM.LIKES,
      method: 'get',
    });
  },
  GET_TEAM_READS() {
    return instance({
      url: API.TEAM.READS,
      method: 'get',
    });
  },
  POST_TEAM_POST({ data }) {
    return instance({
      url: API.TEAM.INDEX,
      method: 'post',
      data,
    });
  },
  EDIT_TEAM_POST({ id, data }) {
    return instance({
      url: `${API.TEAM.INDEX}/${id}`,
      method: 'patch',
      data,
    });
  },
};

export default teamApi;
