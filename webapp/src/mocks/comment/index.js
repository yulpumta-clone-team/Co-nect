import { API, ROOT_URL } from 'constant/api';
import { getResonseWithData } from 'mocks/mockUtils';
import { rest } from 'msw';
import { teamComments } from './teamComments';
import { userComments } from './userComments';

const COMMENT = [
  // GET_USER_COMMENT
  rest.get(`${ROOT_URL + API.USER.DETAIL + API.COMMENT.ORIGIN}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getResonseWithData(userComments)));
  }),
  // POST_USER_COMMENT
  // DELETE_USER_COMMENT
  // PATCH_USER_COMMENT
  // POST_USER_REPLY
  // PATCH_USER_REPLY
  // PATCH_USER_COMMENT_LIKE
  // PATCH_USER_COMMENT_UN_LIKE

  // GET_TEAM_COMMENT
  rest.get(`${ROOT_URL + API.TEAM.DETAIL + API.COMMENT.ORIGIN}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getResonseWithData(teamComments)));
  }),
  // POST_TEAM_COMMENT
  // DELETE_TEAM_COMMENT
  // PATCH_TEAM_COMMENT
  // POST_TEAM_REPLY
  // PATCH_TEAM_REPLY
  // PATCH_TEAM_COMMENT_LIKE
  // PATCH_TEAM_COMMENT_UN_LIKE
];

export default COMMENT;
