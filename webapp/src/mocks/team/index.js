import { API, ROOT_URL } from 'constant/api';
import { rest } from 'msw';
import editTeamDetail from './editTeamDetail';
import teamDetail from './teamDetail';
import teamsList from './teamsList';
import teamComments from './teamComments';

const TEAM = [
  // GET_TEAM_ARR
  rest.get(ROOT_URL + API.TEAM.LIST, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(teamsList));
  }),
  // GET_TEAM_LIKES
  rest.get(`${ROOT_URL + API.TEAM.LIKES}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(teamsList));
  }),
  // GET_TEAM_READS
  rest.get(`${ROOT_URL + API.TEAM.READS}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(teamsList));
  }),
  // GET_TEAM_DETAIL
  rest.get(`${ROOT_URL + API.TEAM.DETAIL}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(teamDetail));
  }),
  // POST_TEAM_POST
  rest.post(`${ROOT_URL + API.TEAM.DETAIL}`, (req, res, ctx) => {
    console.log(req.body);
    return res(ctx.status(200), ctx.json(teamDetail));
  }),
  // EDIT_TEAM_POST
  rest.patch(`${ROOT_URL + API.TEAM.DETAIL}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(editTeamDetail));
  }),
  // GET_COMMENT
  rest.get(`${ROOT_URL + API.TEAM.DETAIL + API.COMMENT}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(teamComments));
  }),
];

export default TEAM;
