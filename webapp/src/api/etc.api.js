import { API } from 'constant/api.constant';
import privateApiInstance from './instance/privateApiInstance';

const etcApi = {
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
  getTechStackAll() {
    return privateApiInstance({
      url: API.TECH_STACK.ALL,
      method: 'get',
    });
  },
  getTechStackWithCategory(category) {
    return privateApiInstance({
      url: API.TECH_STACK.CATEGORY,
      method: 'get',
      params: {
        category,
      },
    });
  },
};

export default etcApi;
