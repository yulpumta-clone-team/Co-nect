import { API } from 'constant/api.constant';
import privateApiInstance from './instance/privateApiInstance';
import publicApiInstance from './instance/publicApiInstance';

const teamApi = {
  GET_TEAM_ARR(config) {
    return publicApiInstance({
      url: API.TEAM.INDEX,
      method: 'get',
      ...config,
    });
  },
  GET_TEAM_DETAIL({ id }) {
    return publicApiInstance({
      url: `${API.TEAM.INDEX}/${id}`,
      method: 'get',
    });
  },
  GET_TEAM_LIKES() {
    return publicApiInstance({
      url: API.TEAM.LIKES,
      method: 'get',
    });
  },
  GET_TEAM_READS() {
    return publicApiInstance({
      url: API.TEAM.READS,
      method: 'get',
    });
  },
  POST_TEAM_POST({ data }) {
    return privateApiInstance({
      url: API.TEAM.INDEX,
      method: 'post',
      data,
    });
  },
  EDIT_TEAM_POST({ id, data }) {
    return privateApiInstance({
      url: `${API.TEAM.INDEX}/${id}`,
      method: 'patch',
      data,
    });
  },
  PATCH_TEAM_LIKE({ id, data }) {
    return privateApiInstance({
      url: `${API.TEAM.INDEX}/${id}`,
      method: 'patch',
      data,
    });
  },
};

export default teamApi;
