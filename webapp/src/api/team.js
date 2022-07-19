import { API } from 'constant/api';
import instance from './core';

const teamApi = {
  GET_TEAM_ARR({ lastPage }) {
    return instance({
      url: API.TEAM.LIST,
      method: 'get',
      params: { lastPage },
    });
  },
  GET_TEAM_DETAIL({ id }) {
    return instance({
      url: `${API.TEAM.DETAIL}/${id}`,
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
      url: API.TEAM.DETAIL,
      method: 'post',
      data,
    });
  },
  EDIT_TEAM_POST({ id, data }) {
    return instance({
      url: `${API.TEAM.DETAIL}/${id}`,
      method: 'patch',
      data,
    });
  },
};

export default teamApi;
