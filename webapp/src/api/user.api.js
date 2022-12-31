import { API } from 'constant/api.constant';
import privateApiInstance from './instance/privateApiInstance';
import publicApiInstance from './instance/publicApiInstance';

const userApi = {
  POST_ESSENTIAL_INFO({ data }) {
    return privateApiInstance({
      url: API.USER.ESSENTIAL_INFO,
      method: 'post',
      data,
    });
  },
  GET_ESSENTIAL_INFO() {
    return privateApiInstance({
      url: API.USER.ESSENTIAL_INFO,
      method: 'get',
    });
  },
  GET_USER_LIST(config) {
    return publicApiInstance({
      url: API.USER.INDEX,
      method: 'get',
      ...config,
    });
  },
  GET_USER_DETAIL({ id }) {
    return publicApiInstance({
      url: `${API.USER.INDEX}/${id}`,
      method: 'get',
    });
  },
  // 내가 좋아요한 목록 요청
  GET_USER_LIKES() {
    return publicApiInstance({
      url: API.USER.LIKES,
      method: 'get',
    });
  },
  // 내가 읽은 목록 요청
  GET_USER_READS() {
    return privateApiInstance({
      url: API.USER.READS,
      method: 'get',
    });
  },
  // 내가 작성한 글 목록 요청
  GET_MY_POSTS() {
    return privateApiInstance({
      url: API.USER.MYPOSTS,
      method: 'get',
    });
  },
  // 유저 프로필 수정 (일단 필수정보입력이랑 같은 요청으로 덮었는 로직입니다.)
  EDIT_USER_PROFILE({ data }) {
    return privateApiInstance({
      url: API.USER.ESSENTIAL_INFO,
      method: 'post',
      data,
    });
  },
};

export default userApi;
