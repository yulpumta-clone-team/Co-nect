import { API, ROOT_API_URL } from 'constant/api';
import { getResonseWithData, successResponseWithEmptyData } from 'mocks/mockUtils';
import { rest } from 'msw';
import { mockMyData } from './mockMyData';

const AUTH = [
  rest.post(ROOT_API_URL + API.AUTH.LOGIN, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getResonseWithData(mockMyData)));
  }),
  rest.post(ROOT_API_URL + API.AUTH.SIGNUP, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
  }),
  rest.get(ROOT_API_URL + API.AUTH.LOGOUT, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
  }),
  rest.delete(ROOT_API_URL + API.AUTH.WITHDRAWAL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
  }),
];

export default AUTH;
