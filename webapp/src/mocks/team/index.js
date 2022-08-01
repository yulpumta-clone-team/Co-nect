import { API, ROOT_API_URL } from 'constant/api';
import { getRandomStatusErrorCode, getResonseWithData } from 'mocks/mockUtils';
import { rest } from 'msw';
import { editTeamDetail } from './editTeamDetail';
import { teamDetail } from './teamDetail';
import { teamsList } from './teamsList';

const TEAM = [
  // GET_TEAM_ARR
  rest.get(ROOT_API_URL + API.TEAM.INDEX, (req, res, ctx) => {
    const lastPage = req.url.searchParams.get('lastPage');
    const newTeamList = teamsList.map((team) => ({ ...team, id: Number(team.id + lastPage) }));
    return res(ctx.status(200), ctx.delay(1500), ctx.json(getResonseWithData(newTeamList)));
  }),
  // GET_TEAM_LIKES
  rest.get(`${ROOT_API_URL + API.TEAM.LIKES}`, (req, res, ctx) => {
    const randomStatusErrorCode = getRandomStatusErrorCode();
    return res(
      ctx.status(randomStatusErrorCode),
      ctx.delay(1500),
      ctx.json(getResonseWithData(teamsList)),
    );
  }),
  // GET_TEAM_READS
  rest.get(`${ROOT_API_URL + API.TEAM.READS}`, (req, res, ctx) => {
    const randomStatusErrorCode = getRandomStatusErrorCode();
    return res(
      ctx.status(randomStatusErrorCode),
      ctx.delay(1500),
      ctx.json(getResonseWithData(teamsList)),
    );
  }),
  // GET_TEAM_DETAIL
  rest.get(`${ROOT_API_URL + API.TEAM.INDEX}/:id`, (req, res, ctx) => {
    const randomStatusErrorCode = getRandomStatusErrorCode();
    return res(ctx.status(randomStatusErrorCode), ctx.json(getResonseWithData(teamDetail)));
  }),
  // POST_TEAM_POST
  rest.post(`${ROOT_API_URL + API.TEAM.INDEX}`, (req, res, ctx) => {
    console.log(req.body);
    return res(ctx.status(200), ctx.json(getResonseWithData(teamDetail)));
  }),
  // EDIT_TEAM_POST
  rest.patch(`${ROOT_API_URL + API.TEAM.INDEX}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getResonseWithData(editTeamDetail)));
  }),
];

export default TEAM;
