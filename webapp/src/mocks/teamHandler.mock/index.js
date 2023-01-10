import { API, ROOT_API_URL } from 'constant/api.constant';
import { getResponseWithData, randomResponse } from 'mocks/mockUtils';
import { rest } from 'msw';
import { editTeamDetail } from './editTeamDetail';
import { teamDetail } from './teamDetail';
import { teamsList } from './teamsList';

const teamHandler = [
  // GET_TEAM_ARR
  rest.get(ROOT_API_URL + API.TEAM.INDEX, (req, res, ctx) => {
    const lastPage = req.url.searchParams.get('lastPage');
    const newTeamList = teamsList.map((team) => ({ ...team, id: Number(team.id + lastPage) }));
    // return randomResponse(res, ctx, newTeamList);
    return res(ctx.status(200), ctx.delay(1500), ctx.json(getResponseWithData(newTeamList)));
  }),
  // GET_TEAM_LIKES
  rest.get(`${ROOT_API_URL + API.TEAM.LIKE}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1500), ctx.json(getResponseWithData(teamsList)));
  }),
  // GET_TEAM_READS
  rest.get(`${ROOT_API_URL + API.TEAM.READS}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1500), ctx.json(getResponseWithData(teamsList)));
  }),
  // GET_TEAM_DETAIL
  rest.get(`${ROOT_API_URL + API.TEAM.INDEX}/:id`, (req, res, ctx) => {
    return randomResponse(res, ctx, teamDetail);
  }),
  // POST_TEAM_POST
  rest.post(`${ROOT_API_URL + API.TEAM.INDEX}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(2000), ctx.json(getResponseWithData(teamDetail)));
  }),
  // EDIT_TEAM_POST
  rest.patch(`${ROOT_API_URL + API.TEAM.INDEX}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getResponseWithData(editTeamDetail)));
  }),
  // ADD_TEAM_LIKE
  rest.patch(`${ROOT_API_URL + API.TEAM.LIKE}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getResponseWithData(teamDetail)));
  }),
  // DELETE_TEAM_LIKE
  rest.delete(`${ROOT_API_URL + API.TEAM.UNLIKE}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getResponseWithData(teamDetail)));
  }),
];

export default teamHandler;
