import teamApi from 'api/team';
import axios from 'axios';
import { catchError } from '_actions/global_action';
import { actionGetTeamList, actionGetTeamDetail, actionPatchTeamLike } from '_actions/team_action';

export function getTeamDetail(dataTosubmit) {
  return async (dispatch) => {
    console.log('TeamDetail ID: ', dataTosubmit);
    const { data } = await axios.get('../_mockData/team.json').then((response) => response.data);
    return dispatch(actionGetTeamDetail({ ...data, team_id: dataTosubmit }));
  };
}

export function getTeamList({ page }) {
  return async (dispatch) => {
    console.log('TeamBoard page count: ', page);
    const { data } = await axios.get('../_mockData/teams.json').then((response) => response.data);
    return dispatch(actionGetTeamList(data));
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
