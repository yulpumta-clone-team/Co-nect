import axios from 'axios';
import { ROOT_API_URL } from 'constant/api.constant';
import { successHandler, errorHandler } from './responseHandler';

const publicApiInstance = axios.create({
  baseURL: ROOT_API_URL,
});

publicApiInstance.defaults.timeout = 2500;

publicApiInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // 요청 에러가 발생했을 때 수행할 로직
    console.log(error); // 디버깅
    return error;
  },
);

publicApiInstance.interceptors.response.use(successHandler, errorHandler);

export default publicApiInstance;
