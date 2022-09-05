import React from 'react';
import TeamCard from './index';

import * as S from './TeamCard.style';

export default {
  title: 'Component/TeamCard',
  component: TeamCard,
  parameters: {
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

export const Default = Template.bind({});
Default.args = {
  cardInfo: {
    id: 0,
    user: {
      id: 123,
      image: '',
      name: '홍길통',
    },
    name: '홍길동팀',
    hopeSession: '6개월 이하',
    commentCnt: 74,
    likeCnt: 51,
    read: 22,
    image:
      'https://user-images.githubusercontent.com/71386219/157435570-a48382a8-63e5-4d25-91f4-e506289424b5.png',
    status: true,
    skills: [
      {
        key: 500,
        category: 'arichitecture',
        techName: 'git',
        image:
          'https://user-images.githubusercontent.com/71386219/186051220-a77fa08e-b501-4baa-af3c-47ae602d25e1.png',
      },
      {
        key: 104,
        category: 'front',
        techName: 'svelte',
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
        key: 303,
        category: 'mobile',
        techName: 'swift',
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
    ],
  },
};
