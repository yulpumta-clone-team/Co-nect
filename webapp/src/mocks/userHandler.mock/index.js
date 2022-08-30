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
  // 유저 필수 정보 생성
  rest.post(ROOT_API_URL + API.USER.ESSENTIAL_INFO, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
  }),
  // 유저 필수 정보 조회
  rest.get(ROOT_API_URL + API.USER.ESSENTIAL_INFO, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getResonseWithData(mockEssentialInfo)));
  }),
  // 유저 목록 조회
  rest.get(ROOT_API_URL + API.USER.INDEX, (req, res, ctx) => {
    const lastPage = req.url.searchParams.get('lastPage');
    const newUserList = userList.map((user) => ({ ...user, id: Number(user.id + lastPage) }));
    if (Number(lastPage) === 3) {
      return res(ctx.status(500), ctx.json(getResonseWithData(newUserList)));
    }
    // return randomResponse(res, ctx, userList);
    return res(ctx.status(200), ctx.json(getResonseWithData(userList)));
  }),
  // 유저가 좋아요 누른 항목 조회
  rest.get(ROOT_API_URL + API.USER.LIKES, (req, res, ctx) => {
    const randomStatusErrorCode = getRandomStatusErrorCode();
    return res(
      ctx.status(randomStatusErrorCode),
      ctx.delay(1500),
      ctx.json(getResonseWithData(userList)),
    );
  }),
  // 유저가 읽은 항목 조회
  rest.get(ROOT_API_URL + API.USER.READS, (req, res, ctx) => {
    const randomStatusErrorCode = getRandomStatusErrorCode();
    return res(
      ctx.status(randomStatusErrorCode),
      ctx.delay(1500),
      ctx.json(getResonseWithData(userList)),
    );
  }),
  // 내가 쓴 목록 조회
  rest.get(ROOT_API_URL + API.USER.MYPOSTS, (req, res, ctx) => {
    const randomStatusErrorCode = getRandomStatusErrorCode();
    // return res(
    //   ctx.status(randomStatusErrorCode),
    //   ctx.delay(1500),
    //   ctx.json(getResonseWithData(myPosts)),
    // );
    return res(ctx.status(200), ctx.json(getResonseWithData(myPosts)));
  }),
  // 유저 디테일 정보 조회
  rest.get(`${ROOT_API_URL + API.USER.INDEX}/:id`, (req, res, ctx) => {
    // return randomResponse(res, ctx, userDetail);
    return res(ctx.status(200), ctx.json(getResonseWithData(userDetail)));
    // return res(ctx.status(403), ctx.json(getResonseWithData(errorResponse)));
  }),
  // 유저 정보 수정 요청
  rest.patch(`${ROOT_API_URL + API.USER.INDEX}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getResonseWithData(userDetail)));
    // return res(ctx.status(403), ctx.json(errorResponse));
  }),
];

export default userHandler;
