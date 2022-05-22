import teamApi from 'api/team';

export function getTeamList({ page }) {
  return teamApi.GET_TEAM_ARR(page).then((response) => response);
}

export function getTeamDetail({ id }) {
  return teamApi.GET_TEAM_DETAIL({ id }).then((response) => response);
}

export function postTeamPost(dataTosubmit) {
  return teamApi.POST_TEAM_POST({ data: dataTosubmit }).then((response) => response);
}

export function patchTeamPost({ id, editTeamInfo }) {
  return teamApi.EDIT_TEAM_POST({ id, data: editTeamInfo }).then((response) => response);
}
