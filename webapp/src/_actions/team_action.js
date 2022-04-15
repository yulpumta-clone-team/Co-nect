import { GET_TEAM_DETAIL, GET_TEAM__ARR, PATCH_TEAM_LIKE } from '_types/teamTypes';

export async function actionGetTeamDetail(responseData) {
  return {
    type: GET_TEAM_DETAIL,
    payload: responseData,
  };
}

export async function actionGetTeamList(responseData) {
  return {
    type: GET_TEAM__ARR,
    payload: responseData,
  };
}

export async function actionPatchTeamLike(responseData) {
  return {
    type: PATCH_TEAM_LIKE,
    payload: responseData,
  };
}
