import { getRandomTechSkills } from 'utils';
import { hopeSessionOption, jobOptions } from 'constant';
import { faker } from '@faker-js/faker/locale/ko';

export const createRandomUser = () => ({
  id: faker.datatype.uuid(),
  email: faker.internet.email(),
  portfolio: faker.internet.email(),
  slogan: faker.lorem.sentence(5),
  content: faker.lorem.paragraphs(4, '<br/>\n'),
  hopeSession: faker.helpers.arrayElement(hopeSessionOption.map(({ value }) => value)),
  job: faker.helpers.arrayElement(jobOptions.map(({ value }) => value)),
  status: false,
  commentCnt: faker.datatype.number({ max: 1000 }),
  likeCnt: faker.datatype.number({ max: 1000 }),
  readCnt: faker.datatype.number({ max: 1000 }),
  image: faker.image.avatar,
  name: faker.name.fullName(),
  skills: getRandomTechSkills(),
});

const createRandomUserCard = () => ({
  id: faker.datatype.uuid(),
  image: faker.image.avatar,
  name: faker.name.fullName(),
  slogan: faker.lorem.sentence(5),
  hopeSession: faker.helpers.arrayElement(hopeSessionOption.map(({ value }) => value)),
  job: faker.helpers.arrayElement(jobOptions.map(({ value }) => value)),
  status: false,
  commentCnt: faker.datatype.number({ max: 1000 }),
  likeCnt: faker.datatype.number({ max: 1000 }),
  readCnt: faker.datatype.number({ max: 1000 }),
  skills: getRandomTechSkills(),
});

export const createRandomUserList = (number) =>
  Array.from({ length: number }, () => createRandomUserCard());
