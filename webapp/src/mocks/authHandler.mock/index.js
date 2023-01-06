import { API, ROOT_API_URL, TOKEN } from 'constant/api.constant';
import {
  getResponseWithData,
  successResponseWithEmptyData,
  errorResponse,
  randomResponse,
} from 'mocks/mockUtils';
import { rest } from 'msw';
import { mockLoginData, mockSignUpData } from './mockMyData';

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
      ctx.set({
        [TOKEN.ACCESS]:
          'eyJhbGciOiJIUzI1NiJ9.YXNkZkBhc2RmYXNkZi5jb20.h-oLZnV0pCeNKa_AM3ilQzerD2Uj7bKUn1xDft5DzOk',
        [TOKEN.REFRESH]:
          'eyJhbGciOiJIUzI1NiJ9.YXNkZkBhc2RmYXNkZi5jb20.h-oLZnV0pCeNKa_AM3ilQzerD2Uj7bKUn1xDft5DzOk',
      }),
      ctx.json(getResponseWithData(mockLoginData)),
    );
  }),
  // 회원가입 요청
  rest.post(ROOT_API_URL + API.AUTH.SIGNUP, (req, res, ctx) => {
    // return res(ctx.status(200), ctx.json(getResonseWithData(mockSignUpData)));
    return res(ctx.status(500), ctx.json(errorResponse));
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
