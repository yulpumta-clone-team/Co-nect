import { API, ROOT_API_URL, TOKEN } from 'constant/api.constant';
import { getResonseWithData, successResponseWithEmptyData } from 'mocks/mockUtils';
import { rest } from 'msw';

const etcHandler = [
  rest.post(ROOT_API_URL + API.AUTH.CHECK_DUPLICATE_EMAIL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
  }),
];

export default etcHandler;
