import { API, ROOT_API_URL } from 'constant/api.constant';
import { rest } from 'msw';
import {
  getResonseWithData,
  getRandomStatusErrorCode,
  errorResponse,
  randomResponse,
  successResponseWithEmptyData,
} from 'mocks/mockUtils';

import { userList } from './usersList';
import { myPosts } from './myPosts';
import { userDetail } from './userDetail';
import { mockEssentialInfo } from './essentialInfo';

const userHandler = [
  rest.post(ROOT_API_URL + API.USER.ESSENTIAL_INFO, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
  }),
  rest.get(ROOT_API_URL + API.USER.ESSENTIAL_INFO, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getResonseWithData(mockEssentialInfo)));
  }),
  // GET_USER_LIST
  rest.get(ROOT_API_URL + API.USER.INDEX, (req, res, ctx) => {
    const lastPage = req.url.searchParams.get('lastPage');
    const newUserList = userList.map((user) => ({ ...user, id: Number(user.id + lastPage) }));
    if (Number(lastPage) === 3) {
      return res(ctx.status(500), ctx.json(getResonseWithData(errorResponse)));
    }
    return randomResponse(res, ctx, userList);
  }),
  // GET_USER_LIKES
  rest.get(ROOT_API_URL + API.USER.LIKES, (req, res, ctx) => {
    const randomStatusErrorCode = getRandomStatusErrorCode();
    return res(
      ctx.status(randomStatusErrorCode),
      ctx.delay(1500),
      ctx.json(getResonseWithData(userList)),
    );
  }),
  // GET_USER_READS
  rest.get(ROOT_API_URL + API.USER.READS, (req, res, ctx) => {
    const randomStatusErrorCode = getRandomStatusErrorCode();
    return res(
      ctx.status(randomStatusErrorCode),
      ctx.delay(1500),
      ctx.json(getResonseWithData(userList)),
    );
  }),
  // GET_MY_POSTS
  rest.get(ROOT_API_URL + API.USER.MYPOSTS, (req, res, ctx) => {
    const randomStatusErrorCode = getRandomStatusErrorCode();
    return res(
      ctx.status(randomStatusErrorCode),
      ctx.delay(1500),
      ctx.json(getResonseWithData(myPosts)),
    );
  }),
  // GET_USER_DETAIL
  rest.get(`${ROOT_API_URL + API.USER.INDEX}/:id`, (req, res, ctx) => {
    // return randomResponse(res, ctx, userDetail);
    return res(ctx.status(200), ctx.json(getResonseWithData(userDetail)));
  }),
  // EDIT_USER_PROFILE
  rest.patch(`${ROOT_API_URL + API.USER.INDEX}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getResonseWithData(userDetail)));
  }),
];

export default userHandler;
