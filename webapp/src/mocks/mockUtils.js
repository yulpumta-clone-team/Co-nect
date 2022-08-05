export const successResponseWithEmptyData = {
  status: '000',
  isSuccess: true,
  code: 1000,
  message: '요청 성공',
  data: {},
};

export const getResonseWithData = (data) => ({
  ...successResponseWithEmptyData,
  data,
});

export const getRandomStatusErrorCode = () => (Math.random() > 0.6 ? 200 : 500);

export const errorResponse = {
  code: 1000,
  message: 'spring용 임시 에러 메세지 입니다.',
  status: 'Denied',
};
