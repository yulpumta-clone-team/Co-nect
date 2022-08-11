import { API } from 'constant/api';
import publicApiInstance from './core/publicApiInstance';

const authApi = {
  POST_LOGIN(data) {
    return publicApiInstance({
      url: API.AUTH.LOGIN,
      method: 'post',
      data,
    });
  },
  POST_SIGN_UP(data) {
    return publicApiInstance({
      url: API.AUTH.SIGNUP,
      method: 'post',
      data,
    });
  },
  DEL_WITHDRAWAL() {
    return publicApiInstance({
      url: API.AUTH.WITHDRAWAL,
      method: 'delete',
    });
  },
};

export default authApi;
