import { API } from 'constant/api';
import privateApiInstance from './core/privateApiInstance';
import publicApiInstance from './core/publicApiInstance';

const skillsAPI = {
  GET_SKILLS_IMG(config) {
    return publicApiInstance({
      url: API.SKILLS.CATEGORY,
      method: 'get',
      ...config,
    });
  },
};

export default teamApi;
