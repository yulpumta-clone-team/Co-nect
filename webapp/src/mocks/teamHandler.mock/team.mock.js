import { getRandomTechSkills } from 'utils';
import { hopeSessionOption } from 'constant';
import { faker } from '@faker-js/faker/locale/ko';
import { createRandomUserInfo, createRandomUserInfoList } from 'mocks/userHandler.mock/user.mock';

export const createRandomTeamPost = () => ({
  id: faker.datatype.uuid(),
  name: faker.address.cityName(),
  userInfo: createRandomUserInfo(),
  userTeamList: createRandomUserInfoList(3),
  content: faker.lorem.paragraphs(4, '<br/>\n'),
  slogan: faker.lorem.sentence(5),
  session: faker.helpers.arrayElement(hopeSessionOption.map(({ value }) => value)),
  commentCnt: faker.datatype.number({ max: 1000 }),
  likeCnt: faker.datatype.number({ max: 1000 }),
  readCnt: faker.datatype.number({ max: 1000 }),
  image: faker.image.avatar,
  skills: getRandomTechSkills(),
});

const createRandomTeamCard = () => ({
  id: faker.datatype.uuid(),
  name: faker.address.cityName(),
  userInfo: createRandomUserInfo(),
  image: faker.image.avatar,
  slogan: faker.lorem.sentence(5),
  session: faker.helpers.arrayElement(hopeSessionOption.map(({ value }) => value)),
  status: Math.random() > 0.6,
  commentCnt: faker.datatype.number({ max: 1000 }),
  likeCnt: faker.datatype.number({ max: 1000 }),
  readCnt: faker.datatype.number({ max: 1000 }),
  skills: getRandomTechSkills(),
});

export const createRandomTeamList = (number) =>
  Array.from({ length: number }, () => createRandomTeamCard());
