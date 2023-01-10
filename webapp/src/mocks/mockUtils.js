export const successResponseWithEmptyData = {
  status: '000',
  isSuccess: true,
  code: 1000,
  message: '요청 성공',
  data: {},
};

export const getResponseWithData = (data) => ({
  ...successResponseWithEmptyData,
  data,
});

export const getRandomStatusErrorCode = () => (Math.random() > 0.4 ? 200 : 500);

export const errorResponse = {
  code: 1000,
  message: 'mock API 임시 에러 메세지',
  status: 'Denied',
};

export const randomResponse = (res, ctx, successData) => {
  const randomStatusErrorCode = getRandomStatusErrorCode();

  if (randomStatusErrorCode === 500) {
    return res(ctx.status(randomStatusErrorCode), ctx.json(errorResponse));
  }

  return res(
    ctx.status(randomStatusErrorCode),
    ctx.delay(1500),
    ctx.json(getResponseWithData(successData)),
  );
};
