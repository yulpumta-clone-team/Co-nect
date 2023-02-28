import { fakerUniqueNumId, getRandomTechSkills } from 'utils';
import { hopeSessionOption, jobOptions } from 'constant';
import { faker } from '@faker-js/faker/locale/ko';

export const createRandomUserId = () => ({ userId: fakerUniqueNumId() });

export const createRandomUserIdList = (number) =>
  Array.from({ length: number }, () => createRandomUserId());

export const createRandomUserInfo = () => ({
  id: fakerUniqueNumId(),
  email: faker.internet.email(),
  name: faker.name.fullName(),
  image: faker.image.avatar(),
});

export const createRandomUserInfoList = (number) =>
  Array.from({ length: number }, () => createRandomUserInfo());

export const createRandomUser = () => ({
  id: fakerUniqueNumId(),
  email: faker.internet.email(),
  portfolio: faker.internet.email(),
  slogan: faker.lorem.sentence(5),
  content: faker.lorem.paragraphs(4, '<br/>\n'),
  hopeSession: faker.helpers.arrayElement(hopeSessionOption.map(({ value }) => value)),
  job: faker.helpers.arrayElement(jobOptions.map(({ value }) => value)),
  status: Math.random() > 0.4,
  commentCnt: faker.datatype.number({ max: 1000 }),
  likeCnt: faker.datatype.number({ max: 1000 }),
  readCnt: faker.datatype.number({ max: 1000 }),
  image: faker.image.avatar(),
  name: faker.name.fullName(),
  skills: getRandomTechSkills(),
});

export const createRandomUserCard = () => ({
  id: fakerUniqueNumId(),
  image: faker.image.avatar(),
  name: faker.name.fullName(),
  slogan: faker.lorem.sentence(5),
  hopeSession: faker.helpers.arrayElement(hopeSessionOption.map(({ value }) => value)),
  job: faker.helpers.arrayElement(jobOptions.map(({ value }) => value)),
  status: Math.random() > 0.4,
  commentCnt: faker.datatype.number({ max: 1000 }),
  likeCnt: faker.datatype.number({ max: 1000 }),
  readCnt: faker.datatype.number({ max: 1000 }),
  skills: getRandomTechSkills(),
});

export const createRandomUserList = (number) =>
  Array.from({ length: number }, () => createRandomUserCard());
