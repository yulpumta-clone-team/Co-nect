import axios from 'axios';
import { POST_TYPE } from 'utils';
import { actionGetComment, actionPostComment } from '_actions/comment_actions';
import { catchError } from '_actions/global_action';

console.log(POST_TYPE, process.env.REACT_APP_MOCK_SERVER_API);

export function getComment(dataTosubmit) {
  return (dispatch) => {
    return axios
      .get('../_mockData/teamComment.json')
      .then((response) => dispatch(actionGetComment({ ...response.data, ...dataTosubmit })))
      .catch((error) => dispatch(catchError(error)));
  };
}

export function postComment(dataTosubmit) {
  return (dispatch) => {
    // console.log('TeamDetail ID: ', dataTosubmit);
    return axios
      .get('../_mockData/newComment.json')
      .then((response) => dispatch(actionPostComment({ ...response.data, ...dataTosubmit })))
      .catch((error) => {
        console.log(error);
        // dispatch(catchError(error))
      });
  };
}
