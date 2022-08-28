import React from 'react';
import { css } from 'styled-components';
import TechSkills from './index';

export default {
  title: 'component/TechSkills',
  component: TechSkills,
  args: {},
  layout: 'fullscreen',
};

function Template(args) {
  return <TechSkills {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  isCarousel: false,
  imageSize: '50px',
  gap: '12px',
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
      key: 207,
      category: 'back',
      techName: 'C#',
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
};

export const Carousel = Template.bind({});
Carousel.args = {
  isCarousel: true,
  imageSize: '50px',
  gap: '12px',
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
};
