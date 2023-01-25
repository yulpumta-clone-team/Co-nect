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

export const getRandomStatusErrorCode = () => (Math.random() > 0.3 ? 200 : 500);

export const errorResponse = {
  code: 1000,
  message: 'mock API 임시 에러 메세지',
  status: 'Denied',
};

export const getResponseWithError = (errorMsg = 'mock API 임시 에러 메세지') => ({
  ...errorResponse,
  message: errorMsg,
});

export const randomResponse = (res, ctx, successData, errorMsg) => {
  const randomStatusErrorCode = getRandomStatusErrorCode();

  if (randomStatusErrorCode === 500) {
    return res(ctx.status(randomStatusErrorCode), ctx.json(getResponseWithError(errorMsg)));
  }

  return res(
    ctx.status(randomStatusErrorCode),
    ctx.delay(2000),
    ctx.json(getResponseWithData(successData)),
  );
};
