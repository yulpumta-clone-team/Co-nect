import { API } from 'constant/api.constant';
import publicApiInstance from './instance/publicApiInstance';

const authApi = {
  login({ submitData }) {
    return publicApiInstance({
      url: API.AUTH.LOGIN,
      method: 'post',
      data: submitData,
    });
  },
  signUp({ submitData }) {
    return publicApiInstance({
      url: API.AUTH.SIGNUP,
      method: 'post',
      data: submitData,
    });
  },
  DEL_WITHDRAWAL() {
    return publicApiInstance({
      url: API.AUTH.WITHDRAWAL,
      method: 'delete',
    });
  },
  checkDuplicateEmail({ email }) {
    return publicApiInstance({
      url: API.AUTH.CHECK_DUPLICATE_EMAIL,
      method: 'patch',
      params: { email },
    });
  },
  checkDuplicateNickName({ name }) {
    return publicApiInstance({
      url: API.AUTH.CHECK_DUPLICATE_NICKNAME,
      method: 'patch',
      params: { name },
    });
  },
};

export default authApi;
