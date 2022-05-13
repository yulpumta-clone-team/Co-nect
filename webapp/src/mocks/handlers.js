import { rest } from 'msw';
import { ROOT_URL } from 'constant/route';
import mockUsers from './mockUsers';
import mockUser from './mockUser';
import mockUserComment from './mockUserComment';
import mockTeams from './mockTeams';
import mockTeam from './mockTeam';
import mockTeamComment from './mockTeamComment';
import mockEditTeamPost from './mockEditTeamPost';

const USER = [
  rest.get(`${ROOT_URL}/users?page=1`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockUsers));
  }),
  rest.get(`${ROOT_URL}/user/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockUser));
  }),
  rest.get(`${ROOT_URL}/user/comment/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockUserComment));
  }),
];

const TEAM = [
  rest.get(`${ROOT_URL}/teams?page=1`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockTeams));
  }),
  rest.get(`${ROOT_URL}/team/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockTeam));
  }),
  rest.patch(`${ROOT_URL}/team/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockEditTeamPost));
  }),
  rest.get(`${ROOT_URL}/team/comment/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockTeamComment));
  }),
];

const handlers = [...USER, ...TEAM];

export default handlers;
