import { API, ROOT_API_URL } from 'constant/api';
import { getRandomStatusErrorCode, getResonseWithData } from 'mocks/mockUtils';
import { rest } from 'msw';
import { skillsImg } from '.skillsImg';

// todo : TeckStack 연결 하기.

export const SKILLS = [
  // GET_SKILLS_IMG
  rest.get(`${ROOT_API_URL + API.SKILLS.CATEGORY}`, (req, res, ctx) => {
    const randomStatusErrorCode = getRandomStatusErrorCode();
    return res(ctx.status(randomStatusErrorCode), ctx.json(getResonseWithData(skillsImg)));
  }),
];
