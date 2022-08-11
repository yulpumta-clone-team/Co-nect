import axios from 'axios';
import { ROOT_API_URL, TOKEN } from 'constant/api';
import { handleToken } from 'service/auth';

import { successHandler, errorHandler } from './responseHandler';

const privateApiInstance = axios.create({
  baseURL: ROOT_API_URL,
});

privateApiInstance.defaults.timeout = 2500;
// privateApiInstance.defaults.withCredentials = true;

privateApiInstance.interceptors.request.use(
  (config) => {
    const accessToken = handleToken.getAccessToken();
    const refreshToken = handleToken.getRefreshToken();
    // 요청을 보내기 전에 수행할 로직
    config.headers['Content-Type'] = 'application/json; charset=utf-8';
    config.headers.Authorization = `Bearer ${accessToken}`;
    config.headers[TOKEN.REFRESH] = refreshToken;
    return config;
  },
  (error) => {
    // 요청 에러가 발생했을 때 수행할 로직
    console.log(error); // 디버깅
    return error;
  },
);

privateApiInstance.interceptors.response.use(successHandler, errorHandler);

export default privateApiInstance;
