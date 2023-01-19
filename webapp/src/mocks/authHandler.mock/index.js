import { API, ROOT_API_URL } from 'constant/api.constant';
import { getResponseWithData, successResponseWithEmptyData, randomResponse } from 'mocks/mockUtils';
import { rest } from 'msw';
import { mockLoginResponse, mockLoginToken } from './mockMyData';

const authHandler = [
  // 이메일 중복체크 요청
  rest.patch(ROOT_API_URL + API.AUTH.CHECK_DUPLICATE_EMAIL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getResponseWithData(false)));
  }),
  // 닉네임 중복체크 요청
  rest.patch(ROOT_API_URL + API.AUTH.CHECK_DUPLICATE_NICKNAME, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getResponseWithData(false)));
  }),
  // 로그인 요청
  rest.post(ROOT_API_URL + API.AUTH.LOGIN, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.set(mockLoginToken),
      ctx.json(getResponseWithData(mockLoginResponse)),
    );
  }),
  // 회원가입 요청
  rest.post(ROOT_API_URL + API.AUTH.SIGNUP, (req, res, ctx) => {
    return randomResponse(res, ctx, {}, '임시: 회원가입에 실패했습니다.');
  }),
  // 로그아웃 요청
  rest.get(ROOT_API_URL + API.AUTH.LOGOUT, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
  }),
  rest.delete(ROOT_API_URL + API.AUTH.WITHDRAWAL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
  }),
];

export default authHandler;
