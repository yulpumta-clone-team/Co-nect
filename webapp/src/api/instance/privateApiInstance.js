import axios from 'axios';
import { ROOT_API_URL, TOKEN } from 'constant/api.constant';
import { handleToken } from 'service/auth';
import { successHandler, errorHandler } from './responseHandler';

const privateApiInstance = axios.create({
  baseURL: ROOT_API_URL,
});

privateApiInstance.defaults.timeout = 2500;
// privateApiInstance.defaults.withCredentials = true;

const setAcessTokenInRequestConfig = (config) => {
  const accessToken = handleToken.getAccessToken();
  const refreshToken = handleToken.getRefreshToken();
  // 요청을 보내기 전에 수행할 로직

  if (!config?.headers || !accessToken || !refreshToken) {
    return config;
  }
  config.headers.Authorization = accessToken;
  config.headers[TOKEN.REFRESH] = refreshToken;
  return config;
};

privateApiInstance.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json; charset=utf-8';
    const newConfig = setAcessTokenInRequestConfig(config);
    return newConfig;
  },
  (error) => {
    // 요청 에러가 발생했을 때 수행할 로직
    console.log(error); // 디버깅
    return error;
  },
);

privateApiInstance.interceptors.response.use(successHandler, errorHandler);

export default privateApiInstance;
