import axios from 'axios';
import { ROOT_API_URL } from 'constant/api';

const rootApiInstance = axios.create({
  baseURL: ROOT_API_URL,
});

rootApiInstance.defaults.timeout = 2500;
// rootApiInstance.defaults.withCredentials = true;

rootApiInstance.interceptors.request.use(
  (config) => {
    // 요청을 보내기 전에 수행할 로직
    config.headers['Content-Type'] = 'application/json; charset=utf-8';
    return config;
  },
  (error) => {
    // 요청 에러가 발생했을 때 수행할 로직
    console.log(error); // 디버깅
    return Promise.reject(error);
  },
);

rootApiInstance.interceptors.response.use(
  (response) => {
    // const {
    //   data: { code, data, message, status },
    // } = response;
    return response;
  },
  (error) => {
    // console.log(error, error.response); // 디버깅
    console.error(error); // 디버깅
    const {
      response: { data, status },
    } = error;
    console.log('data', data);
    return Promise.reject(error);
  },
);

export default rootApiInstance;
