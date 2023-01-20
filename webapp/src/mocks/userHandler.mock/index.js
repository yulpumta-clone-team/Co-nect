import { API, ROOT_API_URL } from 'constant/api.constant';
import { rest } from 'msw';
import {
  getResponseWithData,
  getResponseWithError,
  successResponseWithEmptyData,
} from 'mocks/mockUtils';
import { getTechSkillWithKey } from 'utils';
import { createRandomUser, createRandomUserList } from './user.mock';

let tempEssentialInfo;

const userHandler = [
  // 유저 필수 정보 생성
  rest.post(ROOT_API_URL + API.USER.ESSENTIAL_INFO, (req, res, ctx) => {
    tempEssentialInfo = { ...req.body, id: req.id, skills: getTechSkillWithKey(req.body.skills) };
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
  }),
  // 유저 필수 정보 조회
  rest.get(ROOT_API_URL + API.USER.ESSENTIAL_INFO, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getResponseWithData(tempEssentialInfo)));
  }),
  // 유저 목록 조회
  rest.get(ROOT_API_URL + API.USER.INDEX, (req, res, ctx) => {
    const lastPage = req.url.searchParams.get('lastPage');
    // 3페이지 이상이면 강제로 에러를 반환하기
    if (Number(lastPage) === 3) {
      return res(
        ctx.status(500),
        ctx.json(getResponseWithError('임시 에러: 3페이지 이상이면 에러를 반환합니다.')),
      );
    }
    const mockUserList = createRandomUserList(10);
    return res(ctx.status(200), ctx.delay(1500), ctx.json(getResponseWithData(mockUserList)));
  }),
  // 유저가 좋아요 누른 항목 조회
  rest.get(ROOT_API_URL + API.USER.LIKES, (req, res, ctx) => {
    const mockUserList = createRandomUserList(10);
    return res(ctx.status(200), ctx.delay(1500), ctx.json(getResponseWithData(mockUserList)));
  }),
  // 유저가 읽은 항목 조회
  rest.get(ROOT_API_URL + API.USER.READS, (req, res, ctx) => {
    const mockUserList = createRandomUserList(10);
    return res(ctx.delay(1500), ctx.json(getResponseWithData(mockUserList)));
  }),
  // 내가 쓴 목록 조회
  rest.get(ROOT_API_URL + API.USER.MYPOSTS, (req, res, ctx) => {
    const mockUserList = createRandomUserList(10);
    return res(ctx.status(200), ctx.json(getResponseWithData(mockUserList)));
  }),
  // 유저 디테일 정보 조회
  rest.get(`${ROOT_API_URL + API.USER.INDEX}/:id`, (req, res, ctx) => {
    const randomUser = createRandomUser();
    const mockUserDetail = tempEssentialInfo || randomUser;
    return res(ctx.status(200), ctx.json(getResponseWithData(mockUserDetail)));
  }),
  // 유저 정보 수정 요청
  rest.post(`${ROOT_API_URL + API.USER.ESSENTIAL_INFO}/:id`, (req, res, ctx) => {
    const randomUser = createRandomUser();
    tempEssentialInfo = { id: req.id, ...req.body };
    return res(ctx.status(200), ctx.json(getResponseWithData({ id: req.id, ...req.body })));
  }),
];

export default userHandler;
