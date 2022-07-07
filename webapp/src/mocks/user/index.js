import { ROOT_URL } from 'constant/api';
import { rest } from 'msw';
import userComments from './userComments';
import usersList from './usersList';
import userDetail from './userDetail';

export const emptyUsers = {
  status: '200',
  isSuccess: true,
  code: 1000,
  message: '요청 성공',
  data: [],
};

export const USER = [
  rest.get(`${ROOT_URL}/users`, (req, res, ctx) => {
    const lastPage = Number(req.url.searchParams.get('lastPage'));
    if (lastPage >= 2) {
      return res(ctx.status(200), ctx.json(emptyUsers));
    }
    return res(ctx.status(200), ctx.json(usersList));
  }),
  rest.get(`${ROOT_URL}/user/liking`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(usersList));
  }),
  rest.get(`${ROOT_URL}/user/read`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(usersList));
  }),
  rest.get(`${ROOT_URL}/user/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(userDetail));
  }),
  rest.get(`${ROOT_URL}/user/comment/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(userComments));
  }),
];
