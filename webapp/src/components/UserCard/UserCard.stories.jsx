import React from 'react';
import UserCard from './index';

import * as S from './UserCard.style';

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
    name: '홍길동',
    userJob: '학생',
    hopeSession: '6 개월 이하',
    likeCnt: 3,
    img: 'https://user-images.githubusercontent.com/71386219/157435570-a48382a8-63e5-4d25-91f4-e506289424b5.png',
    job: '학생',
    belong_team: true,
    skills: [
      {
        key: 500,
        category: 'arichitecture',
        techName: 'git',
        image:
          'https://user-images.githubusercontent.com/71386219/186051220-a77fa08e-b501-4baa-af3c-47ae602d25e1.png',
      },
      {
        key: 501,
        category: 'arichitecture',
        techName: 'docker',
        image:
          'https://user-images.githubusercontent.com/71386219/186051220-a77fa08e-b501-4baa-af3c-47ae602d25e1.png',
      },
      {
        key: 502,
        category: 'arichitecture',
        techName: 'kubernetes',
        image:
          'https://user-images.githubusercontent.com/71386219/186051220-a77fa08e-b501-4baa-af3c-47ae602d25e1.png',
      },
      {
        key: 503,
        category: 'arichitecture',
        techName: 'aws',
        image:
          'https://user-images.githubusercontent.com/71386219/186051220-a77fa08e-b501-4baa-af3c-47ae602d25e1.png',
      },
      {
        key: 504,
        category: 'arichitecture',
        techName: 'jest',
        image:
          'https://user-images.githubusercontent.com/71386219/186051220-a77fa08e-b501-4baa-af3c-47ae602d25e1.png',
      },
      {
        key: 505,
        category: 'arichitecture',
        techName: 'cypress',
        image:
          'https://user-images.githubusercontent.com/71386219/186051220-a77fa08e-b501-4baa-af3c-47ae602d25e1.png',
      },
      {
        key: 200,
        category: 'back',
        techName: 'nodeJs',
        image:
          'https://user-images.githubusercontent.com/71386219/186051220-a77fa08e-b501-4baa-af3c-47ae602d25e1.png',
      },
    ],
  },
};
