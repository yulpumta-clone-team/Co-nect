import teamApi from 'api/team';

export const getTeamList = ({ page }) => teamApi.GET_TEAM_ARR(page).then((response) => response);

export const getTeamDetail = ({ id }) =>
  teamApi.GET_TEAM_DETAIL({ id }).then((response) => response);

export const postTeamPost = (dataTosubmit) =>
  teamApi.POST_TEAM_POST({ data: dataTosubmit }).then((response) => response);

export const patchTeamPost = ({ id, editTeamInfo }) =>
  teamApi.EDIT_TEAM_POST({ id, data: editTeamInfo }).then((response) => response);
