import { MOCK_SERVER_URL } from 'constant/route';
import instance from './core';

const teamApi = {
  GET_TEAM_ARR(lastPage) {
    return instance({
      url: `/teams`,
      method: 'get',
      params: { lastPage },
    });
  },
  GET_TEAM_DETAIL({ id }) {
    return instance({
      url: `/team/${id}`,
      method: 'get',
    });
  },
  EDIT_TEAM_POST({ id, data }) {
    return instance({
      url: `/team/${id}`,
      method: 'patch',
      data,
    });
  },
  GET_TEAM_LIKES() {
    return instance({
      url: '/team/liking',
      method: 'get',
    });
  },
};

export default teamApi;
