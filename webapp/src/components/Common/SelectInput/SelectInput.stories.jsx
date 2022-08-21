import React from 'react';
import SelectInput from './index';

export default {
  title: 'Common/SelectInput',
  component: SelectInput,
  args: {},
  layout: 'centered',
};

function Template(args) {
  return <SelectInput {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  value: '',
  name: '기본',
  label: '기본',
  defaultOption: { id: 0, value: '기본1', label: '기본1' },
  options: [
    { id: 0, value: '기본1', label: '기본1' },
    { id: 1, value: '기본2', label: '기본2' },
    { id: 2, value: '기본3', label: '기본3' },
    { id: 3, value: '기본4', label: '기본4' },
  ],
};

export const WithError = Template.bind({});
WithError.args = {
  value: '',
  name: '에러',
  label: '에러',
  defaultOption: { id: 0, value: '기본1', label: '기본1' },
  options: [
    { id: 0, value: '기본1', label: '기본1' },
    { id: 1, value: '기본2', label: '기본2' },
    { id: 2, value: '기본3', label: '기본3' },
    { id: 3, value: '기본4', label: '기본4' },
  ],
  placeholder: 'Error',
  isError: true,
  helperText: '에러 입니다.',
};
