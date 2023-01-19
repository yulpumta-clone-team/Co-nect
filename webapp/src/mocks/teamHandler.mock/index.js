import { API, ROOT_API_URL } from 'constant/api.constant';
import { getResponseWithData, randomResponse, successResponseWithEmptyData } from 'mocks/mockUtils';
import { rest } from 'msw';
import { getTechSkillWithKey } from 'utils';
import { createRandomTeamList, createRandomTeamPost } from './team.mock';

let tempEssentialInfo;

const teamHandler = [
  // GET_TEAM_ARR
  rest.get(ROOT_API_URL + API.TEAM.INDEX, (req, res, ctx) => {
    const mockTeamList = createRandomTeamList(10);
    return res(ctx.status(200), ctx.delay(1500), ctx.json(getResponseWithData(mockTeamList)));
  }),
  // GET_TEAM_LIKES
  rest.get(`${ROOT_API_URL + API.TEAM.LIKE}`, (req, res, ctx) => {
    const mockTeamList = createRandomTeamList(10);
    return res(ctx.status(200), ctx.delay(1500), ctx.json(getResponseWithData(mockTeamList)));
  }),
  // GET_TEAM_READS
  rest.get(`${ROOT_API_URL + API.TEAM.READS}`, (req, res, ctx) => {
    const mockTeamList = createRandomTeamList(10);
    return res(ctx.status(200), ctx.delay(1500), ctx.json(getResponseWithData(mockTeamList)));
  }),
  // GET_TEAM_DETAIL
  rest.get(`${ROOT_API_URL + API.TEAM.INDEX}/:id`, (req, res, ctx) => {
    const randomTeam = createRandomTeamPost();
    const mockTeamDetail = tempEssentialInfo || randomTeam;
    return randomResponse(res, ctx, mockTeamDetail);
  }),
  // POST_TEAM_POST
  rest.post(`${ROOT_API_URL + API.TEAM.INDEX}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(2000), ctx.json(successResponseWithEmptyData()));
  }),
  // EDIT_TEAM_POST
  rest.patch(`${ROOT_API_URL + API.TEAM.INDEX}/:id`, (req, res, ctx) => {
    tempEssentialInfo = { ...req.body, id: req.id, skills: getTechSkillWithKey(req.body.skills) };
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData()));
  }),
  // ADD_TEAM_LIKE
  rest.patch(`${ROOT_API_URL + API.TEAM.LIKE}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData()));
  }),
  // DELETE_TEAM_LIKE
  rest.delete(`${ROOT_API_URL + API.TEAM.UNLIKE}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData()));
  }),
];

export default teamHandler;
