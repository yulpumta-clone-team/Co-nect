import { API, ROOT_URL } from 'constant/api';
import { rest } from 'msw';
import { getResonseWithData, getRandomStatusErrorCode } from 'mocks/mockUtils';
import { userList } from './usersList';
import { myPosts } from './myPosts';
import { userDetail } from './userDetail';

const USER = [
  // GET_USER_LIST
  rest.get(ROOT_URL + API.USER.LIST, (req, res, ctx) => {
    const lastPage = req.url.searchParams.get('lastPage');
    const newUserList = userList.map((user) => ({ ...user, id: Number(user.id + lastPage) }));
    if (Number(lastPage) === 3) {
      return res(ctx.status(500), ctx.json(getResonseWithData(newUserList)));
    }
    return res(ctx.status(200), ctx.json(getResonseWithData(newUserList)));
  }),
  // GET_USER_LIKES
  rest.get(ROOT_URL + API.USER.LIKES, (req, res, ctx) => {
    const randomStatusErrorCode = getRandomStatusErrorCode();
    return res(
      ctx.status(randomStatusErrorCode),
      ctx.delay(1500),
      ctx.json(getResonseWithData(userList)),
    );
  }),
  // GET_USER_READS
  rest.get(ROOT_URL + API.USER.READS, (req, res, ctx) => {
    const randomStatusErrorCode = getRandomStatusErrorCode();
    return res(
      ctx.status(randomStatusErrorCode),
      ctx.delay(1500),
      ctx.json(getResonseWithData(userList)),
    );
  }),
  // GET_MY_POSTS
  rest.get(ROOT_URL + API.USER.MYPOSTS, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1500), ctx.json(getResonseWithData(myPosts)));
  }),
  // GET_USER_DETAIL
  rest.get(`${ROOT_URL + API.USER.DETAIL}/:id`, (req, res, ctx) => {
    const randomStatusErrorCode = getRandomStatusErrorCode();
    return res(ctx.status(randomStatusErrorCode), ctx.json(getResonseWithData(userDetail)));
  }),
  // EDIT_USER_PROFILE
  rest.patch(`${ROOT_URL + API.USER.DETAIL}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getResonseWithData(userDetail)));
  }),
];

export default USER;
