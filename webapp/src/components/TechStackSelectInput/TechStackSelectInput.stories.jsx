import { skillStack } from 'constant';
import React from 'react';
import { skillStackParser } from 'service/skillStack.parser';
import TechStackSelectInput from './index';

export default {
  title: 'Component/TechStackSelectInput',
  component: TechStackSelectInput,
  args: {},
  layout: 'fullscreen',
};

function Template(args) {
  return <TechStackSelectInput {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  selectedTechSkills: [
    {
      id: 500,
      category: 'arichitecture',
      label: 'git',
      value: 'git',
      image:
        'https://user-images.githubusercontent.com/71386219/186051220-a77fa08e-b501-4baa-af3c-47ae602d25e1.png',
    },
  ],
  name: 'TechStackSelectInput',
  label: 'TechStackSelectInput',
  techSkillOptions: skillStackParser(skillStack),
  placeholder: 'selectedTechSkills',
};

export const WithError = Template.bind({});
WithError.args = {
  selectedTechSkills: [],
  name: 'name',
  label: 'label',
  techSkillOptions: skillStackParser(skillStack),
  placeholder: 'Error',
  isError: true,
  helperText: '에러 입니다.',
};
