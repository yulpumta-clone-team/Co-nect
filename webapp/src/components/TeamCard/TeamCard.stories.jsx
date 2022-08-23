import React from 'react';
import TeamCard from './index';

import * as S from './style';

export default {
  title: 'Component/TeamCard',
  component: TeamCard,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

function Template(args) {
  return (
    <S.CardWrapper>
      <TeamCard {...args} />
    </S.CardWrapper>
  );
}

// function

export const Default = Template.bind({});
Default.args = {
  cardInfo: {
    id: 0,
    user: '홍길동',
    name: '홍길동팀',
    userJob: '학생',
    hopeSession: '6개월 이하',
    likeCnt: 3,
    img: 'https://user-images.githubusercontent.com/71386219/157435570-a48382a8-63e5-4d25-91f4-e506289424b5.png',
    status: '모집중',
    belong_team: true,
    skills: 1,
  },
};
