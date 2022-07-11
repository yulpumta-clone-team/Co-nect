import { API, ROOT_URL } from 'constant/api';
import { rest } from 'msw';
import userComments from './userComments';
import usersList from './usersList';
import userDetail from './userDetail';

const USER = [
  rest.get(ROOT_URL + API.USER.LIST, (req, res, ctx) => {
    const lastPage = Number(req.url.searchParams.get('lastPage'));
    if (lastPage >= 2) {
      return res(ctx.status(200), ctx.json(usersList));
    }
    return res(ctx.status(200), ctx.json(usersList));
  }),
  rest.get(ROOT_URL + API.USER.LIKES, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(usersList));
  }),
  rest.get(ROOT_URL + API.USER.READS, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(usersList));
  }),
  rest.get(`${ROOT_URL + API.USER.DETAIL}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(userDetail));
  }),
  rest.get(`${ROOT_URL + API.USER.DETAIL + API.COMMENT}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(userComments));
  }),
];

export default USER;
