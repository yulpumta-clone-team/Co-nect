import userApi from 'api/user';
import { catchError } from '_actions/global_action';
import { actionGetUserDetail, actionGetUserList, actionPatchUserLike } from '_actions/user_action';

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
    console.log('UserDetail ID: ', id);
    return userApi
      .GET_USER_DETAIL({ id })
      .then((response) => dispatch(actionGetUserDetail(response)))
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
