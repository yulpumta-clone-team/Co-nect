import { API, ROOT_API_URL } from 'constant/api.constant';
import {
  errorResponse,
  getResponseWithData,
  randomResponse,
  successResponseWithEmptyData,
} from 'mocks/mockUtils';
import { rest } from 'msw';
import { teamComments } from './teamComments';
import { userComments } from './userComments';

const commentHandler = [
  // ------------ USER ------------
  // GET_USER_COMMENT
  rest.get(`${ROOT_API_URL + API.USER.INDEX + API.COMMENT.ORIGIN}/:id`, (req, res, ctx) => {
    // return randomResponse(res, ctx, userComments);
    return res(ctx.status(200), ctx.delay(1500), ctx.json(getResponseWithData(userComments)));
  }),
  // POST_USER_COMMENT
  rest.post(`${ROOT_API_URL + API.USER.INDEX + API.COMMENT.ORIGIN}`, (req, res, ctx) => {
    // return randomResponse(res, ctx, {});
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
    // return res(ctx.status(403), ctx.json(errorResponse));
    // return res(ctx.status(500), ctx.json(errorResponse));
  }),
  // DELETE_USER_COMMENT
  rest.delete(`${ROOT_API_URL + API.USER.INDEX + API.COMMENT.ORIGIN}/:id`, (req, res, ctx) => {
    return randomResponse(res, ctx, {});
  }),
  // PATCH_USER_COMMENT
  rest.patch(`${ROOT_API_URL + API.USER.INDEX + API.COMMENT.ORIGIN}/:id`, (req, res, ctx) => {
    return randomResponse(res, ctx, {});
  }),
  // POST_USER_REPLY
  rest.post(`${ROOT_API_URL + API.USER.INDEX + API.COMMENT.NESTED}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
    // return randomResponse(res, ctx, {});
  }),
  // DELETE_USER_REPLY
  rest.delete(`${ROOT_API_URL + API.USER.INDEX + API.COMMENT.NESTED}/:id`, (req, res, ctx) => {
    return randomResponse(res, ctx, {});
  }),
  // PATCH_USER_REPLY
  rest.patch(`${ROOT_API_URL + API.USER.INDEX + API.COMMENT.NESTED}/:id`, (req, res, ctx) => {
    return randomResponse(res, ctx, {});
  }),
  // PATCH_USER_COMMENT_LIKE
  rest.patch(`${ROOT_API_URL + API.USER.INDEX + API.COMMENT.LIKE}/:id`, (req, res, ctx) => {
    return randomResponse(res, ctx, {});
  }),
  // PATCH_USER_COMMENT_UN_LIKE
  rest.patch(`${ROOT_API_URL + API.USER.INDEX + API.COMMENT.UNLIKE}/:id`, (req, res, ctx) => {
    return randomResponse(res, ctx, {});
  }),
  // ------------ TEAM ------------
  // GET_TEAM_COMMENT
  rest.get(`${ROOT_API_URL + API.TEAM.INDEX + API.COMMENT.ORIGIN}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getResponseWithData(teamComments)));
  }),
  // POST_TEAM_COMMENT
  rest.post(`${ROOT_API_URL + API.TEAM.INDEX + API.COMMENT.ORIGIN}`, (req, res, ctx) => {
    return randomResponse(res, ctx, {});
  }),
  // DELETE_TEAM_COMMENT
  rest.delete(`${ROOT_API_URL + API.TEAM.INDEX + API.COMMENT.ORIGIN}/:id`, (req, res, ctx) => {
    return randomResponse(res, ctx, {});
  }),
  // PATCH_TEAM_COMMENT
  rest.patch(`${ROOT_API_URL + API.TEAM.INDEX + API.COMMENT.ORIGIN}/:id`, (req, res, ctx) => {
    return randomResponse(res, ctx, {});
  }),
  // POST_TEAM_REPLY
  rest.post(`${ROOT_API_URL + API.TEAM.INDEX + API.COMMENT.NESTED}`, (req, res, ctx) => {
    return randomResponse(res, ctx, {});
  }),
  // DELETE_TEAM_REPLY
  rest.delete(`${ROOT_API_URL + API.TEAM.INDEX + API.COMMENT.NESTED}/:id`, (req, res, ctx) => {
    return randomResponse(res, ctx, {});
  }),
  // PATCH_TEAM_REPLY
  rest.patch(`${ROOT_API_URL + API.TEAM.INDEX + API.COMMENT.NESTED}/:id`, (req, res, ctx) => {
    return randomResponse(res, ctx, {});
  }),
  // PATCH_TEAM_COMMENT_LIKE
  rest.patch(`${ROOT_API_URL + API.TEAM.INDEX + API.COMMENT.LIKE}/:id`, (req, res, ctx) => {
    return randomResponse(res, ctx, {});
  }),
  // PATCH_TEAM_COMMENT_UN_LIKE
  rest.patch(`${ROOT_API_URL + API.TEAM.INDEX + API.COMMENT.UNLIKE}/:id`, (req, res, ctx) => {
    return randomResponse(res, ctx, {});
  }),
];

export default commentHandler;
