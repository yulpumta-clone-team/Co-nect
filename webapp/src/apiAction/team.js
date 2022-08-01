import teamApi from 'api/team';
import axios from 'axios';
import dayjs from 'dayjs';
import uuid from 'react-uuid';
import { catchError } from '_actions/global_action';
import {
  actionGetTeamList,
  actionGetTeamDetail,
  actionPostTeamComment,
  actionPatchTeamComment,
  actionDeleteTeamComment,
  actionSecretTeamComment,
  actionPostTeamReply,
  actionDeleteTeamReply,
  actionPatchTeamReply,
  actionSecretTeamReply,
  actionPatchTeamLike,
  actionPostTeamPost,
} from '_actions/team_action';

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

export function postTeamPost(dataTosubmit) {
  return async (dispatch) => {
    return teamApi
      .POST_TEAM_POST(dataTosubmit)
      .then((response) => dispatch(actionPostTeamPost(response)))
      .catch((error) => dispatch(catchError(error)));
  };
}

export function postTeamComment(dataToSubmit) {
  return (dispatch) => {
    const { team_id, writter_id, nickname, content, isSecret } = dataToSubmit;
    const newCommentCreateAt = dayjs().format('YYYY-MM-DD HH:mm:ss.ssssss');
    const newCommentId = uuid();
    const newComment = {
      ...commentObj,
      writter_id,
      id: newCommentId,
      nickname,
      content,
      isSecret,
      createdAt: newCommentCreateAt,
      updatedAt: newCommentCreateAt,
    };
    return dispatch(actionPostTeamComment(newComment));
    // return teamApi
    //   .POST_Team_COMMENT(newComment)
    //   .then((response) => dispatch(actionPostTeamComment(response)))
    //   .catch((error) => dispatch(catchError(error)));
  };
}

export function postTeamReply(dataToSubmit) {
  return (dispatch) => {
    const { postId: team_id, parent_id, nickname, content, writter_id } = dataToSubmit;
    const newCommentCreateAt = dayjs().format('YYYY-MM-DD HH:mm:ss.ssssss');
    const newCommentId = uuid();
    const newComment = {
      ...commentObj,
      team_id,
      parent_id,
      id: newCommentId,
      writter_id,
      nickname,
      content,
      createdAt: newCommentCreateAt,
      updatedAt: newCommentCreateAt,
    };
    return dispatch(actionPostTeamReply(newComment));
    // return teamApi
    //   .POST_Team_COMMENT(newComment)
    //   .then((response) => dispatch(actionPostTeamComment(response)))
    //   .catch((error) => dispatch(catchError(error)));
  };
}

export function deleteTeamComment(dataToSubmit) {
  return (dispatch) => {
    const { postId: team_id, id } = dataToSubmit;
    return dispatch(actionDeleteTeamComment(id));
    // return teamApi
    //   .POST_Team_COMMENT(newComment)
    //   .then((response) => dispatch(actionPostTeamComment(response)))
    //   .catch((error) => dispatch(catchError(error)));
  };
}

export function deleteTeamReply(dataToSubmit) {
  return (dispatch) => {
    const { id, postId, parent_id } = dataToSubmit;
    return dispatch(actionDeleteTeamReply(dataToSubmit));
    // return teamApi
    //   .POST_Team_COMMENT(newComment)
    //   .then((response) => dispatch(actionPostTeamComment(response)))
    //   .catch((error) => dispatch(catchError(error)));
  };
}

export function patchTeamComment(dataToSubmit) {
  return (dispatch) => {
    const updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss.ssssss');
    const { postId: team_id, id, editContent, comment } = dataToSubmit;
    const editiedComment = {
      ...comment,
      id,
      team_id,
      content: editContent,
      updatedAt,
    };
    return dispatch(actionPatchTeamComment(editiedComment));
    // return PATCH_Team_COMMENT
    //   .POST_Team_COMMENT(newComment)
    //   .then((response) => dispatch(actionPostTeamComment(response)))
    //   .catch((error) => dispatch(catchError(error)));
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

export function patchTeamReply(dataToSubmit) {
  return (dispatch) => {
    const updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss.ssssss');
    const { id, postId: team_id, parent_id, editContent, comment } = dataToSubmit;
    const editiedComment = {
      ...comment,
      id,
      parent_id,
      team_id,
      content: editContent,
      updatedAt,
    };
    return dispatch(actionPatchTeamReply(editiedComment));
    // return teamApi
    //   .PATCH_Team_REPLY(newComment)
    //   .then((response) => dispatch(actionPostTeamComment(response)))
    //   .catch((error) => dispatch(catchError(error)));
  };
}
export function handleSecretTeamReply(dataToSubmit) {
  return (dispatch) => {
    const updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss.ssssss');
    return dispatch(actionSecretTeamReply({ ...dataToSubmit, updatedAt }));
    // return teamApi
    //   .POST_Team_COMMENT(newComment)
    //   .then((response) => dispatch(actionPostTeamComment(response)))
    //   .catch((error) => dispatch(catchError(error)));
  };
}

export function handleSecretTeamComment(dataToSubmit) {
  return (dispatch) => {
    const updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss.ssssss');
    return dispatch(actionSecretTeamComment({ ...dataToSubmit, updatedAt }));
    // return teamApi
    //   .POST_Team_COMMENT(newComment)
    //   .then((response) => dispatch(actionPostTeamComment(response)))
    //   .catch((error) => dispatch(catchError(error)));
  };
}

const commentObj = {
  team_id: null,
  id: null,
  writter_id: null,
  nickname: null,
  users_like: [],
  isLike: false,
  content: null,
  img: 'https://user-images.githubusercontent.com/71386219/157435570-a48382a8-63e5-4d25-91f4-e506289424b5.png',
  createdAt: null,
  updatedAt: null,
  isSecret: false,
  replies: [],
};
