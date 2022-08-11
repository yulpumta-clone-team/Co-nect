import privateApiInstance from './core/privateApiInstance';

const uploadApi = {
  IMAGE_UPLOAD(data) {
    return privateApiInstance({
      url: '/upload',
      method: 'post',
      data,
    });
  },
};

export default uploadApi;
