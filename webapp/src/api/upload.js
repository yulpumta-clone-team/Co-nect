import instance from './core';

const uploadApi = {
  IMAGE_UPLOAD(data) {
    return instance({
      url: '/upload',
      method: 'post',
      data,
    });
  },
};

export default uploadApi;
