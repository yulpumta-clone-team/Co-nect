import { API } from 'constant/api';
import authApiInstance from './core/authApiInstance';

const authApi = {
  POST_LOGIN(data) {
    return authApiInstance({
      url: API.AUTH.LOGIN,
      method: 'post',
      data,
    });
  },
  POST_SIGN_UP(data) {
    return authApiInstance({
      url: API.AUTH.SIGNUP,
      method: 'post',
      data,
    });
  },
  DEL_WITHDRAWAL() {
    return authApiInstance({
      url: API.AUTH.WITHDRAWAL,
      method: 'delete',
    });
  },
};

export default authApi;
