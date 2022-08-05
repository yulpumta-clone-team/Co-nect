import rootApiInstance from './core/rootApiInstance';

const uploadApi = {
  IMAGE_UPLOAD(data) {
    return rootApiInstance({
      url: '/upload',
      method: 'post',
      data,
    });
  },
};

export default uploadApi;
