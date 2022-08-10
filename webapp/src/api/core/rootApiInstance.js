import axios from 'axios';
import { ROOT_API_URL, TOKEN } from 'constant/api';
import handleLocalstorage from 'utils/handleLocalstorage';
import { successHandler, errorHandler } from './responseHandler';

const rootApiInstance = axios.create({
  baseURL: ROOT_API_URL,
});

rootApiInstance.defaults.timeout = 2500;
// rootApiInstance.defaults.withCredentials = true;

rootApiInstance.interceptors.request.use(
  (config) => {
    const accessToken = handleLocalstorage.get(TOKEN.ACCESS);
    const refreshToken = handleLocalstorage.get(TOKEN.REFRESH);
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

rootApiInstance.interceptors.response.use(successHandler, errorHandler);

export default rootApiInstance;
