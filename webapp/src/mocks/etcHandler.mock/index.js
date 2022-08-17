import { API, ROOT_API_URL } from 'constant/api.constant';
import { successResponseWithEmptyData } from 'mocks/mockUtils';
import { rest } from 'msw';

const etcHandler = [
  rest.post(ROOT_API_URL + API.UPLOAD.POST, (req, res, ctx) => {
    console.log('req', req);
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
  }),
  rest.get(ROOT_API_URL + API.UPLOAD.DELETE, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successResponseWithEmptyData));
  }),
];

export default etcHandler;
