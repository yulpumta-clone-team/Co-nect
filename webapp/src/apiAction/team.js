import teamApi from 'api/team';
import { catchError } from '_actions/global_action';
import {
  actionGetTeamList,
  actionGetTeamDetail,
  actionPatchTeamLike,
  actionPostTeamPost,
  actionPatchTeamPost,
} from '_actions/team_action';

export function getTeamList({ page }) {
  return teamApi.GET_TEAM_ARR(page).then((response) => response);
}

export function getTeamDetail({ id }) {
  return teamApi.GET_TEAM_DETAIL({ id }).then((response) => response);
}

export function postTeamPost(dataTosubmit) {
  return async (dispatch) => {
    return teamApi
      .POST_TEAM_POST(dataTosubmit)
      .then((response) => dispatch(actionPostTeamPost(response)))
      .catch((error) => dispatch(catchError(error)));
  };
}

export function patchTeamPost({ id, editTeamInfo }) {
  return (dispatch) => {
    return teamApi
      .EDIT_TEAM_POST({ id, data: editTeamInfo })
      .then((response) => dispatch(actionPatchTeamPost(response.data.data)))
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
