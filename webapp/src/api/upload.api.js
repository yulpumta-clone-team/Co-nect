import privateApiInstance from './instance/privateApiInstance';

const uploadApi = {
  uploadImage(data) {
    return privateApiInstance({
      url: '/upload',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      method: 'post',
      data,
    });
  },
  deleteImage(imgUrl) {
    return privateApiInstance({
      url: '/upload',
      method: 'post',
      params: {
        imgUrl,
      },
    });
  },
};

export default uploadApi;
