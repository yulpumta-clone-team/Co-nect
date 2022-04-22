import teamApi from 'api/team';
import userApi from 'api/user';
import axios from 'axios';
import { POST_TYPE } from 'utils';
import { actionGetComment, actionPostComment } from '_actions/comment_actions';
import { catchError } from '_actions/global_action';

console.log(POST_TYPE);

function getPostTypeApi(postType) {
  return postType === POST_TYPE.USER ? userApi : teamApi;
}

export function getComment({ postType, postId }) {
  return (dispatch) => {
    return getPostTypeApi(postType)
      ?.GET_TEAM_COMMENT(postId)
      .then((response) => dispatch(actionGetComment(response)))
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
