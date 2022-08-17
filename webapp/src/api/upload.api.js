import { API } from 'constant/api.constant';
import privateApiInstance from './instance/privateApiInstance';

const uploadApi = {
  uploadImage(data) {
    return privateApiInstance({
      url: API.UPLOAD.POST,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      method: 'post',
      data,
    });
  },
  deleteImage(imgUrl) {
    return privateApiInstance({
      url: API.UPLOAD.DELETE,
      method: 'get',
      params: {
        imgUrl,
      },
    });
  },
};

export default uploadApi;
