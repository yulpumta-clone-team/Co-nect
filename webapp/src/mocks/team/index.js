import { API, API_SERVER_URI } from 'constant/api';
import { getRandomStatusErrorCode, getResonseWithData } from 'mocks/mockUtils';
import { rest } from 'msw';
import { editTeamDetail } from './editTeamDetail';
import { teamDetail } from './teamDetail';
import { teamsList } from './teamsList';

const TEAM = [
  // GET_TEAM_LIST
  rest.get(API_SERVER_URI + API.TEAM.LIST, (req, res, ctx) => {
    const lastPage = req.url.searchParams.get('lastPage');
    const newTeamList = teamsList.map((team) => ({ ...team, id: Number(team.id + lastPage) }));
    return res(ctx.status(200), ctx.delay(1500), ctx.json(getResonseWithData(newTeamList)));
  }),
  // GET_TEAM_LIKES
  rest.get(`${API_SERVER_URI + API.TEAM.LIKES}`, (req, res, ctx) => {
    const randomStatusErrorCode = getRandomStatusErrorCode();
    return res(
      ctx.status(randomStatusErrorCode),
      ctx.delay(1500),
      ctx.json(getResonseWithData(teamsList)),
    );
  }),
  // GET_TEAM_READS
  rest.get(`${API_SERVER_URI + API.TEAM.READS}`, (req, res, ctx) => {
    const randomStatusErrorCode = getRandomStatusErrorCode();
    return res(
      ctx.status(randomStatusErrorCode),
      ctx.delay(1500),
      ctx.json(getResonseWithData(teamsList)),
    );
  }),
  // GET_TEAM_DETAIL
  rest.get(`${API_SERVER_URI + API.TEAM.DETAIL}/:id`, (req, res, ctx) => {
    const randomStatusErrorCode = getRandomStatusErrorCode();
    return res(ctx.status(randomStatusErrorCode), ctx.json(getResonseWithData(teamDetail)));
  }),
  // POST_TEAM_POST
  rest.post(`${API_SERVER_URI + API.TEAM.DETAIL}`, (req, res, ctx) => {
    console.log(req.body);
    return res(ctx.status(200), ctx.json(getResonseWithData(teamDetail)));
  }),
  // EDIT_TEAM_POST
  rest.patch(`${API_SERVER_URI + API.TEAM.DETAIL}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getResonseWithData(editTeamDetail)));
  }),
];

export default TEAM;
