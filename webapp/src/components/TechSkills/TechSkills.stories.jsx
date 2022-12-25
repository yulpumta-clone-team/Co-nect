import React from 'react';
import { TECH_SKILLS } from 'constant/techskill.constant';
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
  skills: TECH_SKILLS,
};

export const Carousel = Template.bind({});
Carousel.args = {
  isCarousel: true,
  imageSize: '50px',
  gap: '12px',
  skills: TECH_SKILLS,
};

export const EmptySkills = Template.bind({});
EmptySkills.args = {
  isCarousel: true,
  imageSize: '50px',
  gap: '12px',
  skills: [],
};
