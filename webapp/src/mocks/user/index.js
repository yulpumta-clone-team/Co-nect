import { API, ROOT_URL } from 'constant/api';
import { rest } from 'msw';
import userComments from './userComments';
import usersList from './usersList';
import userDetail from './userDetail';
import myPosts from './myPosts';

const USER = [
  // GET_USER_LIST
  rest.get(ROOT_URL + API.USER.LIST, (req, res, ctx) => {
    const lastPage = Number(req.url.searchParams.get('lastPage'));
    if (lastPage >= 2) {
      return res(ctx.status(200), ctx.json(usersList));
    }
    return res(ctx.status(200), ctx.json(usersList));
  }),
  // GET_USER_LIKES
  rest.get(ROOT_URL + API.USER.LIKES, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(usersList));
  }),
  // GET_USER_READS
  rest.get(ROOT_URL + API.USER.READS, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(usersList));
  }),
  // GET_MY_POSTS
  rest.get(ROOT_URL + API.USER.MYPOSTS, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(myPosts));
  }),
  // GET_USER_DETAIL
  rest.get(`${ROOT_URL + API.USER.DETAIL}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(userDetail));
  }),
  // EDIT_USER_PROFILE
  rest.patch(`${ROOT_URL + API.USER.DETAIL}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(userDetail));
  }),
  // GET_COMMENT
  rest.get(`${ROOT_URL + API.USER.DETAIL + API.COMMENT}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(userComments));
  }),
];

export default USER;
