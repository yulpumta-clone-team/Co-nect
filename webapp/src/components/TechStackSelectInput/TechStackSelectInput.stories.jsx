import handlers from 'mocks/handlers';
import React, { useState } from 'react';
import TechStackSelectInput from './index';

export default {
  title: 'Component/TechStackSelectInput',
  component: TechStackSelectInput,
  parameters: {
    msw: handlers,
  },
  layout: 'fullscreen',
};

function Template(args) {
  const [selectedTechSkills, setSelectedTechSkills] = useState([]);
  const onChange = ({ name, value }) => {
    setSelectedTechSkills(value);
  };
  return (
    <TechStackSelectInput {...args} selectedTechSkills={selectedTechSkills} onChange={onChange} />
  );
}

export const Default = Template.bind({});
Default.args = {
  selectedTechSkills: [],
  name: 'techSkills',
  label: '기술스택선택하기',
  placeholder: 'selectedTechSkills',
};

export const WtihValue = Template.bind({});
WtihValue.args = {
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
  placeholder: 'selectedTechSkills',
};

export const WtihSelectedOptionViewer = Template.bind({});
WtihSelectedOptionViewer.args = {
  isDropdownType: true,
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
  placeholder: 'selectedTechSkills',
};

export const WtihMultiValue = Template.bind({});
WtihMultiValue.args = {
  selectedTechSkills: [
    {
      id: 500,
      category: 'arichitecture',
      label: 'git',
      value: 'git',
      image:
        'https://user-images.githubusercontent.com/71386219/186051220-a77fa08e-b501-4baa-af3c-47ae602d25e1.png',
    },
    {
      id: 202,
      category: 'back',
      label: 'express',
      value: 'express',
      image:
        'https://user-images.githubusercontent.com/71386219/186051220-a77fa08e-b501-4baa-af3c-47ae602d25e1.png',
    },
    {
      id: 203,
      category: 'back',
      label: 'java',
      value: 'java',
      image:
        'https://user-images.githubusercontent.com/71386219/186051220-a77fa08e-b501-4baa-af3c-47ae602d25e1.png',
    },
  ],
  name: 'techSkills',
  label: '기술스택선택하기',
  placeholder: 'selectedTechSkills',
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
