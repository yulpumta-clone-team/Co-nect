import { API, ROOT_URL } from 'constant/api';
import { getResonseWithData } from 'mocks/mockUtils';
import { rest } from 'msw';
import { teamComments } from './teamComments';
import { userComment, userComments } from './userComments';

const COMMENT = [
  // GET_USER_COMMENT
  rest.get(`${ROOT_URL + API.USER.DETAIL + API.COMMENT.ORIGIN}/:id`, (req, res, ctx) => {
    console.log('request GET_USER_COMMENT');
    return res(ctx.status(200), ctx.json(getResonseWithData(userComments)));
  }),
  // POST_USER_COMMENT
  rest.post(`${ROOT_URL + API.USER.DETAIL + API.COMMENT.ORIGIN}`, (req, res, ctx) => {
    console.log('request POST_USER_COMMENT');
    const newUserComments = [userComment, ...userComments];
    return res(ctx.status(200), ctx.json(getResonseWithData(newUserComments)));
  }),
  // DELETE_USER_COMMENT
  rest.delete(`${ROOT_URL + API.USER.DETAIL + API.COMMENT.ORIGIN}/:id`, (req, res, ctx) => {
    console.log('request DELETE_USER_COMMENT');
    return res(ctx.status(200), ctx.json(getResonseWithData(userComments)));
  }),
  // PATCH_USER_COMMENT
  rest.patch(`${ROOT_URL + API.USER.DETAIL + API.COMMENT.ORIGIN}/:id`, (req, res, ctx) => {
    console.log('request PATCH_USER_COMMENT');
    const { body, params } = req;
    return res(ctx.status(200), ctx.json(getResonseWithData(userComments)));
  }),
  // POST_USER_REPLY
  rest.post(`${ROOT_URL + API.USER.DETAIL + API.COMMENT.ORIGIN}/:id`, (req, res, ctx) => {
    console.log('request POST_USER_REPLY');
    return res(ctx.status(200), ctx.json(getResonseWithData(userComments)));
  }),
  // DELETE_USER_REPLY
  rest.delete(`${ROOT_URL + API.USER.DETAIL + API.COMMENT.ORIGIN}/:id`, (req, res, ctx) => {
    console.log('request DELETE_USER_REPLY');
    return res(ctx.status(200), ctx.json(getResonseWithData(userComments)));
  }),
  // PATCH_USER_REPLY
  rest.patch(`${ROOT_URL + API.USER.DETAIL + API.COMMENT.ORIGIN}/:id`, (req, res, ctx) => {
    console.log('request PATCH_USER_REPLY');
    return res(ctx.status(200), ctx.json(getResonseWithData(userComments)));
  }),

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
