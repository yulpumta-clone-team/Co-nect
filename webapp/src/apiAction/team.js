import teamApi from 'api/team';
import { catchError } from '_actions/global_action';
import {
  actionGetTeamList,
  actionGetTeamDetail,
  actionPatchTeamLike,
  actionPostTeamPost,
} from '_actions/team_action';

export function getTeamDetail({ id }) {
  return async (dispatch) => {
    return teamApi
      .GET_TEAM_DETAIL({ id })
      .then((response) => dispatch(actionGetTeamDetail(response)))
      .catch((error) => dispatch(catchError(error)));
  };
}

export function getTeamList({ page }) {
  return async (dispatch) => {
    return teamApi
      .GET_TEAM_ARR({ page })
      .then((response) => dispatch(actionGetTeamList))
      .catch((error) => dispatch(catchError(error)));
  };
}

export function patchTeamlike({ teamId }) {
  return (dispatch) => {
    return teamApi
      .PATCH_TEAM_LIKE({ team_id: teamId })
      .then((response) => dispatch(actionPatchTeamLike(response)))
      .catch((error) => dispatch(catchError(error)));
  };
}

export function postTeamPost(dataTosubmit) {
  return async (dispatch) => {
    return teamApi
      .POST_TEAM_POST(dataTosubmit)
      .then((response) => dispatch(actionPostTeamPost(response)))
      .catch((error) => dispatch(catchError(error)));
  };
}
