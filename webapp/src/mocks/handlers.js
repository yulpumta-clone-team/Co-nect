import { rest } from 'msw';
import { ROOT_URL } from 'constant/api';
import teamComments from './team/teamComments';
import teamDetail from './team/teamDetail';
import teamsList from './team/teamsList';
import editTeamDetail from './team/editTeamDetail';
import { USER } from './user';

const TEAM = [
  rest.get(`${ROOT_URL}/teams`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(teamsList));
  }),
  rest.get(`${ROOT_URL}/team/liking`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(teamsList));
  }),
  rest.get(`${ROOT_URL}/team/read`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(teamsList));
  }),
  rest.post(`${ROOT_URL}/team`, (req, res, ctx) => {
    console.log(req.body);
    return res(ctx.status(200), ctx.json(teamDetail));
  }),
  rest.patch(`${ROOT_URL}/team/:id`, (req, res, ctx) => {
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
