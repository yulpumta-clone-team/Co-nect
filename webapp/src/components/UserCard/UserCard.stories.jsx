import { createRandomUserCard } from 'mocks/userHandler.mock/user.mock';
import React from 'react';
import UserCard from './index';

import * as S from './UserCard.style';

export default {
  title: 'Component/UserCard',
  component: UserCard,
  parameters: {
    layout: 'fullscreen',
  },
};

function Template(args) {
  return (
    <S.CardWrapper>
      <UserCard {...args} />
    </S.CardWrapper>
  );
}

// function

export const Default = Template.bind({});
Default.args = {
  cardInfo: createRandomUserCard(),
};
