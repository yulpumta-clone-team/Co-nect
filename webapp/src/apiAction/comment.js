import teamApi from 'api/team';
import axios from 'axios';
import { actionGetComment, actionPostComment } from '_actions/comment_actions';
import { catchError } from '_actions/global_action';

export function getComment(dataTosubmit) {
  return (dispatch) => {
    return axios
      .get('../_mockData/teamComment.json')
      .then((response) => dispatch(actionGetComment({ ...response.data, ...dataTosubmit })))
      .catch((error) => dispatch(catchError(error)));
  };
}

export function postComment(dataTosubmit) {
  return async (dispatch) => {
    // console.log('TeamDetail ID: ', dataTosubmit);
    const { data } = await axios.get('../_mockData/team.json').then((response) => response.data);
    return dispatch(actionPostComment({ ...data, team_id: dataTosubmit }));
  };
}
