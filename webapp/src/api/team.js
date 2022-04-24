import { MOCK_SERVER_URL } from 'constant/route';
import instance from './core';

const teamApi = {
  GET_TEAM_ARR({ page }) {
    return instance({
      url: '/team',
      method: 'get',
      params: { lastPage: page },
    });
  },
  GET_TEAM_DETAIL({ id }) {
    return instance({
      url: '/team/join',
      method: 'get',
      params: { id },
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
