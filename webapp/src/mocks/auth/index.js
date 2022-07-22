import { API, API_SERVER_URI } from 'constant/api';
import { getResonseWithData, successResponseWithEmptyData } from 'mocks/mockUtils';
import { rest } from 'msw';
import { mockMyData } from './mockMyData';

const AUTH = [
  rest.post(API_SERVER_URI + API.AUTH.LOGIN, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getResonseWithData(mockMyData)));
  }),
  rest.post(API_SERVER_URI + API.AUTH.SIGNUP, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
  }),
  rest.get(API_SERVER_URI + API.AUTH.LOGOUT, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
  }),
  rest.delete(API_SERVER_URI + API.AUTH.WITHDRAWAL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
  }),
];

export default AUTH;
