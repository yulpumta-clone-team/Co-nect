import { rest } from 'msw';
import { ROOT_URL } from 'constant/route';
import userComments from './user/userComments';
import teamComments from './team/teamComments';
import usersList from './user/usersList';
import userDetail from './user/userDetail';
import teamDetail from './team/teamDetail';
import teamsList from './team/teamsList';
import editTeamDetail from './team/editTeamDetail';

const emptyUsers = {
  status: '200',
  isSuccess: true,
  code: 1000,
  message: '요청 성공',
  data: [],
};

const USER = [
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

const TEAM = [
  rest.get(`${ROOT_URL}/teams`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(teamsList));
  }),
  rest.post(`${ROOT_URL}/team`, (req, res, ctx) => {
    console.log(req.body);
    return res(ctx.status(200), ctx.json(teamDetail));
  }),
  rest.get(`${ROOT_URL}/team/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(teamDetail));
  }),
  rest.patch(`${ROOT_URL}/team/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(editTeamDetail));
  }),
  rest.get(`${ROOT_URL}/team/comment/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(teamComments));
  }),
];

const handlers = [...USER, ...TEAM];

export default handlers;
