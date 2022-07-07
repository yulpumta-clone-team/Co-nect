import { ROOT_URL } from 'constant/api';
import { rest } from 'msw';

const responseObj = {
  status: '000',
  isSuccess: true,
  code: 1000,
  message: '요청 성공',
  data: {},
};

const mockUser = {
  email: 'string',
  pwd: 'string',
};

/* eslint-disable import/prefer-default-export */
export const AUTH = [
  rest.post(`${ROOT_URL}/user/login`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        ...responseObj,
        data: {
          mockUser,
        },
      }),
    );
  }),
  rest.post(`${ROOT_URL}/user/join`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(responseObj));
  }),
  rest.get(`${ROOT_URL}/user/logout`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(responseObj));
  }),
  rest.delete(`${ROOT_URL}/user/withdrawal`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(responseObj));
  }),
];
