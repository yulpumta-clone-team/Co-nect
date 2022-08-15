import { API, ROOT_API_URL, TOKEN } from 'constant/api';
import { getResonseWithData, successResponseWithEmptyData } from 'mocks/mockUtils';
import { rest } from 'msw';
import { mockLoginData, mockSignUpData } from './mockMyData';

const AUTH = [
  rest.post(ROOT_API_URL + API.AUTH.LOGIN, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.set({
        [TOKEN.ACCESS]:
          'eyJhbGciOiJIUzI1NiJ9.YXNkZkBhc2RmYXNkZi5jb20.h-oLZnV0pCeNKa_AM3ilQzerD2Uj7bKUn1xDft5DzOk',
        [TOKEN.REFRESH]:
          'eyJhbGciOiJIUzI1NiJ9.YXNkZkBhc2RmYXNkZi5jb20.h-oLZnV0pCeNKa_AM3ilQzerD2Uj7bKUn1xDft5DzOk',
      }),
      ctx.json(getResonseWithData(mockLoginData)),
    );
  }),
  rest.post(ROOT_API_URL + API.AUTH.SIGNUP, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getResonseWithData(mockSignUpData)));
  }),
  rest.get(ROOT_API_URL + API.AUTH.LOGOUT, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
  }),
  rest.delete(ROOT_API_URL + API.AUTH.WITHDRAWAL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
  }),
];

export default AUTH;
