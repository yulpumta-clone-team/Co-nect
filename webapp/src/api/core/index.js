import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
  headers: { 'Access-Control-Allow-Origin': process.env.REACT_APP_SERVER_API },
  withCredentials: true,
});

instance.defaults.timeout = 2500;

instance.interceptors.request.use(
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

instance.interceptors.response.use(
  (response) => {
    // const {
    //   data: { code, data, message, status },
    // } = response;
    return response;
  },
  (error) => {
    console.log(error, error.response); // 디버깅
    return Promise.reject(error);
  },
);

export default instance;
