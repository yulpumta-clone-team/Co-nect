import { TOKEN } from 'constant/api.constant';

export const mockLoginResponse = {
  isFirst: Math.random() > 0.4,
};

export const mockLoginToken = {
  [TOKEN.ACCESS]:
    'eyJhbGciOiJIUzI1NiJ9.YXNkZkBhc2RmYXNkZi5jb20.h-oLZnV0pCeNKa_AM3ilQzerD2Uj7bKUn1xDft5DzOk',
  [TOKEN.REFRESH]:
    'eyJhbGciOiJIUzI1NiJ9.YXNkZkBhc2RmYXNkZi5jb20.h-oLZnV0pCeNKa_AM3ilQzerD2Uj7bKUn1xDft5DzOk',
};
