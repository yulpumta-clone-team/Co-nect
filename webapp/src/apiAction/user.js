import userApi from 'api/user';
import { catchError } from '_actions/global_action';
import {
  actionGetUserDetail,
  actionGetUserList,
  actionPatchUserLike,
  actionPatchUserProfile,
} from '_actions/user_action';

export function getUserList({ page }) {
  return (dispatch) => {
    return userApi
      .GET_USER_LIST({ page })
      .then((response) => dispatch(actionGetUserList(response)))
      .catch((error) => dispatch(catchError(error)));
  };
}

export function getUserDetail({ id }) {
  return (dispatch) => {
    return userApi
      .GET_USER_DETAIL({ id })
      .then((response) => dispatch(actionGetUserDetail(response)))
      .catch((error) => dispatch(catchError(error)));
  };
}

export function patchUserProfile({ teamId }) {
  return (dispatch) => {
    return userApi
      .EDIT_USER_PROFILE({ team_id: teamId })
      .then((response) => dispatch(actionPatchUserProfile(response)))
      .catch((error) => dispatch(catchError(error)));
  };
}

export function patchUserlike({ teamId }) {
  return (dispatch) => {
    return userApi
      .PATCH_USER_LIKE({ team_id: teamId })
      .then((response) => dispatch(actionPatchUserLike(response)))
      .catch((error) => dispatch(catchError(error)));
  };
}
