import { MOCK_SERVER_URL } from 'constant/route';
import instance from './core';

const teamApi = {
  GET_TEAM_ARR({ page }) {
    return instance({
      url: `${MOCK_SERVER_URL}/teams`,
      method: 'get',
      params: { page },
    });
  },
  GET_TEAM_DETAIL({ id }) {
    return instance({
      url: `${MOCK_SERVER_URL}/team/${id}`,
      method: 'get',
    });
  },
  EDIT_TEAM_POST({ id, data }) {
    return instance({
      url: `${MOCK_SERVER_URL}/team/${id}`,
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
