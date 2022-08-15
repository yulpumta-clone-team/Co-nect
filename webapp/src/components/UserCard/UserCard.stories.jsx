import React from 'react';
import UserCard from './UserCard';

import * as S from './style';

export default {
  title: 'Component/UserCard',
  component: UserCard,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
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
  cardInfo: {
    id: 0,
    name: '스토리북 예시',
    hopeSession: '무관',
    likeCnt: 3,
  },
};
