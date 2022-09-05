import handlers from 'mocks/handlers';
import React from 'react';
import { skillStackParser } from 'service/skillStack.parser';
import { skillStack } from 'constant';
import TechStackSelectInputView from './TechStackSelectInput.view';

export default {
  title: 'Component/TechStackSelectInputView',
  component: TechStackSelectInputView,
  args: {},
  parameters: {
    msw: handlers,
  },
  layout: 'fullscreen',
};

function Template(args) {
  return <TechStackSelectInputView {...args} />;
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
  name: 'techSkills',
  label: '기술스택선택하기',
  techSkillOptions: skillStackParser(skillStack),
  placeholder: 'selectedTechSkills',
  skillStack,
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
  skillStack,
};
