import { API } from 'constant/api.constant';
import privateApiInstance from './instance/privateApiInstance';

const uploadApi = {
  uploadImage(formData) {
    return privateApiInstance({
      url: API.UPLOAD.POST,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      method: 'post',
      data: formData,
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
