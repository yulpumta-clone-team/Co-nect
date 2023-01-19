import { faker } from '@faker-js/faker/locale/ko';
import { createRandomUserIdList, createRandomUserInfo } from 'mocks/userHandler.mock/user.mock';

export const createComment = () => {
  const id = faker.datatype.uuid();
  return {
    id,
    userInfo: createRandomUserInfo(),
    secret: Math.random() > 0.5,
    content: faker.lorem.sentence(5),
    updatedAt: faker.datatype.datetime(),
    feelings: createRandomUserIdList(),
    replies: createReplyList(id),
  };
};

export const createReply = (parentId) => ({
  parentId,
  id: faker.datatype.uuid(),
  userInfo: createRandomUserInfo(),
  secret: Math.random() > 0.5,
  content: faker.lorem.sentence(5),
  updatedAt: faker.datatype.datetime(),
  feelings: createRandomUserIdList(),
});

export const createCommentList = () =>
  Array.from({ length: faker.datatype.number({ max: 10 }) }, () => createComment());

export const createReplyList = (parentId) =>
  Array.from({ length: faker.datatype.number({ max: 20 }) }, () => createReply(parentId));
