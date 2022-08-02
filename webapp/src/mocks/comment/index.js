import { API, ROOT_API_URL } from 'constant/api';
import { getResonseWithData, successResponseWithEmptyData } from 'mocks/mockUtils';
import { rest } from 'msw';
import { teamComments } from './teamComments';
import { userComments } from './userComments';

const COMMENT = [
  // ------------ USER ------------
  // GET_USER_COMMENT
  rest.get(`${ROOT_API_URL + API.USER.INDEX + API.COMMENT.ORIGIN}/:id`, (req, res, ctx) => {
    console.log('request GET_USER_COMMENT');
    return res(ctx.status(200), ctx.json(getResonseWithData(userComments)));
  }),
  // POST_USER_COMMENT
  rest.post(`${ROOT_API_URL + API.USER.INDEX + API.COMMENT.ORIGIN}`, (req, res, ctx) => {
    console.log('request POST_USER_COMMENT');
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
  }),
  // DELETE_USER_COMMENT
  rest.delete(`${ROOT_API_URL + API.USER.INDEX + API.COMMENT.ORIGIN}/:id`, (req, res, ctx) => {
    console.log('request DELETE_USER_COMMENT');
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
  }),
  // PATCH_USER_COMMENT
  rest.patch(`${ROOT_API_URL + API.USER.INDEX + API.COMMENT.ORIGIN}/:id`, (req, res, ctx) => {
    console.log('request PATCH_USER_COMMENT');
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
  }),
  // POST_USER_REPLY
  rest.post(`${ROOT_API_URL + API.USER.INDEX + API.COMMENT.NESTED}/:id`, (req, res, ctx) => {
    console.log('request POST_USER_REPLY');
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
  }),
  // DELETE_USER_REPLY
  rest.delete(`${ROOT_API_URL + API.USER.INDEX + API.COMMENT.NESTED}/:id`, (req, res, ctx) => {
    console.log('request DELETE_USER_REPLY');
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
  }),
  // PATCH_USER_REPLY
  rest.patch(`${ROOT_API_URL + API.USER.INDEX + API.COMMENT.NESTED}/:id`, (req, res, ctx) => {
    console.log('request PATCH_USER_REPLY');
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
  }),
  // PATCH_USER_COMMENT_LIKE
  rest.patch(`${ROOT_API_URL + API.USER.INDEX + API.COMMENT.LIKE}/:id`, (req, res, ctx) => {
    console.log('request PATCH_USER_REPLY');
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
  }),
  // PATCH_USER_COMMENT_UN_LIKE
  rest.patch(`${ROOT_API_URL + API.USER.INDEX + API.COMMENT.UNLIKE}/:id`, (req, res, ctx) => {
    console.log('request PATCH_USER_REPLY');
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
  }),
  // ------------ TEAM ------------
  // GET_TEAM_COMMENT
  rest.get(`${ROOT_API_URL + API.TEAM.INDEX + API.COMMENT.ORIGIN}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getResonseWithData(teamComments)));
  }),
  // POST_TEAM_COMMENT
  rest.post(`${ROOT_API_URL + API.TEAM.INDEX + API.COMMENT.ORIGIN}`, (req, res, ctx) => {
    console.log('request POST_TEAM_COMMENT');
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
  }),
  // DELETE_TEAM_COMMENT
  rest.delete(`${ROOT_API_URL + API.TEAM.INDEX + API.COMMENT.ORIGIN}/:id`, (req, res, ctx) => {
    console.log('request DELETE_TEAM_COMMENT');
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
  }),
  // PATCH_TEAM_COMMENT
  rest.patch(`${ROOT_API_URL + API.TEAM.INDEX + API.COMMENT.ORIGIN}/:id`, (req, res, ctx) => {
    console.log('request PATCH_TEAM_COMMENT');
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
  }),
  // POST_TEAM_REPLY
  rest.post(`${ROOT_API_URL + API.TEAM.INDEX + API.COMMENT.NESTED}`, (req, res, ctx) => {
    console.log('request POST_TEAM_REPLY');
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
  }),
  // DELETE_TEAM_REPLY
  rest.delete(`${ROOT_API_URL + API.TEAM.INDEX + API.COMMENT.NESTED}/:id`, (req, res, ctx) => {
    console.log('request DELETE_TEAM_REPLY');
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
  }),
  // PATCH_TEAM_REPLY
  rest.patch(`${ROOT_API_URL + API.TEAM.INDEX + API.COMMENT.NESTED}/:id`, (req, res, ctx) => {
    console.log('request PATCH_TEAM_REPLY');
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
  }),
  // PATCH_TEAM_COMMENT_LIKE
  rest.patch(`${ROOT_API_URL + API.TEAM.INDEX + API.COMMENT.LIKE}/:id`, (req, res, ctx) => {
    console.log('request PATCH_TEAM_REPLY');
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
  }),
  // PATCH_TEAM_COMMENT_UN_LIKE
  rest.patch(`${ROOT_API_URL + API.TEAM.INDEX + API.COMMENT.UNLIKE}/:id`, (req, res, ctx) => {
    console.log('request PATCH_TEAM_REPLY');
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
  }),
];

export default COMMENT;
