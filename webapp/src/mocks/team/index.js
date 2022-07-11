import { API, ROOT_URL } from 'constant/api';
import { rest } from 'msw';
import editTeamDetail from './editTeamDetail';
import teamDetail from './teamDetail';
import teamsList from './teamsList';
import teamComments from './teamComments';

const TEAM = [
  rest.get(ROOT_URL + API.TEAM.LIST, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(teamsList));
  }),
  rest.get(`${ROOT_URL + API.TEAM.LIKES}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(teamsList));
  }),
  rest.get(`${ROOT_URL + API.TEAM.READS}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(teamsList));
  }),
  rest.post(`${ROOT_URL + API.TEAM.DETAIL}`, (req, res, ctx) => {
    console.log(req.body);
    return res(ctx.status(200), ctx.json(teamDetail));
  }),
  rest.get(`${ROOT_URL + API.TEAM.DETAIL}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(teamDetail));
  }),
  rest.patch(`${ROOT_URL + API.TEAM.DETAIL}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(editTeamDetail));
  }),
  rest.get(`${ROOT_URL + API.TEAM.DETAIL + API.COMMENT}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(teamComments));
  }),
];

export default TEAM;
