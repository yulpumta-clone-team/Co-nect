import instance from './core';

const teamApi = {
  GET_TEAM_ARR({ page }) {
    return instance({
      url: '/team',
      method: 'get',
      params: { lastPage: page },
    });
  },
  GET_TEAM_DETAIL({ id }) {
    return instance({
      url: '/team/join',
      method: 'get',
      params: { id },
    });
  },
  GET_TEAM_LIKES() {
    return instance({
      url: '/team/liking',
      method: 'get',
    });
  },
  POST_TEAM_POST(data) {
    return instance({
      url: 'api/team',
      method: 'post',
      data,
    });
  },
  POST_TEAM_COMMENT(data) {
    return instance({
      url: '/team/comment',
      method: 'post',
      data,
    });
  },
  POST_TEAM_REPLY(data) {
    return instance({
      url: '/team/nested_comment',
      method: 'post',
      data,
    });
  },
  DELETE_TEAM_COMMENT({ comment_id }) {
    return instance({
      url: '/team/comment',
      method: 'delete',
      params: { comment_id },
    });
  },
  // DELETE_TEAM_REPLY() {
  //   return instance({
  //     url: '/team/logout',
  //   });
  // },
  PATCH_TEAM_LIKE({ team_id }) {
    return instance({
      url: '/team/liking',
      method: 'patch',
      params: { team_id },
    });
  },
  PATCH_TEAM_COMMENT(data) {
    return instance({
      url: '/team/comment',
      method: 'patch',
      data,
    });
  },
  PATCH_TEAM_REPLY(data) {
    return instance({
      url: '/team/nested_comment',
      method: 'patch',
      data,
    });
  },
  // HANDLE_SECRET_TEAM_REPLY() {
  //   return instance({
  //     url: '/team/logout',
  //   });
  // },
  // HANDLE_SECRET_TEAM_COMMENT() {
  //   return instance({
  //     url: '/team/logout',
  //   });
  // },
};

export default teamApi;
