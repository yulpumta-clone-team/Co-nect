import userApi from 'api/user';

export const getUserList = ({ page }) => userApi.GET_USER_LIST(page).then((response) => response);

export const getUserDetail = ({ id }) =>
  userApi.GET_USER_DETAIL({ id }).then((response) => response);

export const patchUserProfile = ({ id }) =>
  userApi.EDIT_USER_PROFILE({ id }).then((response) => response);

export const getUserLikeList = () => userApi.GET_USER_LIKES().then((response) => response);

export const getUserReadList = () => userApi.GET_USER_READS().then((response) => response);
