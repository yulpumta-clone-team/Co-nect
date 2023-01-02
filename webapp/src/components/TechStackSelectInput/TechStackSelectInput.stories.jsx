import { TECH_SKILLS } from 'constant/techskill.constant';
import handlers from 'mocks/handlers';
import React, { useState } from 'react';
import { skillStackParser } from 'service/etc/skillStack.parser';
import TechStackSelectInput from './index';

export default {
  title: 'Component/TechStackSelectInput',
  component: TechStackSelectInput,
  parameters: {
    msw: handlers,
  },
  layout: 'fullscreen',
};

const techSkillOptions = skillStackParser(TECH_SKILLS);

function Template(args) {
  // eslint-disable-next-line react/destructuring-assignment
  const [selectedTechSkills, setSelectedTechSkills] = useState([]);
  const onChange = ({ name, value }) => {
    setSelectedTechSkills(value);
  };
  return (
    <TechStackSelectInput
      {...args}
      // eslint-disable-next-line react/destructuring-assignment
      selectedTechSkills={args.selectedTechSkills || selectedTechSkills}
      onChange={onChange}
    />
  );
}

export const Default = Template.bind({});
Default.args = {
  name: 'techSkills',
  label: '기술스택선택하기',
  placeholder: '기술스택을 선택해주세요.',
};

export const WtihValue = Template.bind({});
WtihValue.args = {
  selectedTechSkills: [techSkillOptions[1]],
  name: 'techSkills',
  label: '기술스택선택하기',
  placeholder: '기술스택을 선택해주세요.',
};

export const WtihSelectedOptionViewer = Template.bind({});
WtihSelectedOptionViewer.args = {
  isDropdownType: true,
  selectedTechSkills: [techSkillOptions[20]],
  name: 'techSkills',
  label: '기술스택선택하기',
  placeholder: '기술스택을 선택해주세요.',
};

export const WtihMultiValue = Template.bind({});
WtihMultiValue.args = {
  selectedTechSkills: techSkillOptions,
  name: 'techSkills',
  label: '기술스택선택하기',
  placeholder: '기술스택을 선택해주세요.',
};

export const WithErrorInSelectedOptionViewer = Template.bind({});
WithErrorInSelectedOptionViewer.args = {
  selectedTechSkills: [],
  name: 'name',
  label: 'label',
  placeholder: 'Error',
  isError: true,
  helperText: '에러 입니다.',
  isDropdownType: true,
};

export const WithError = Template.bind({});
WithError.args = {
  selectedTechSkills: [],
  name: 'name',
  label: 'label',
  placeholder: 'Error',
  isError: true,
  helperText: '에러 입니다.',
};
