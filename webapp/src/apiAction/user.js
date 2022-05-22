import userApi from 'api/user';

export function getUserList({ page }) {
  return userApi.GET_USER_LIST(page).then((response) => response);
}

export function getUserDetail({ id }) {
  return userApi.GET_USER_DETAIL({ id }).then((response) => response);
}

export function patchUserProfile({ id }) {
  return userApi.EDIT_USER_PROFILE({ id }).then((response) => response);
}

export function getUserLikeList() {
  return userApi.GET_USER_LIKES().then((response) => response);
}

export function getUserReadList() {
  return userApi.GET_USER_READS().then((response) => response);
}
