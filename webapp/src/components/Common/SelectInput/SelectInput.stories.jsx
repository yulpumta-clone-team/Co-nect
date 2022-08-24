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

export const SignlePlaceHolder = Template.bind({});
SignlePlaceHolder.args = {
  value: 'SignlePlaceHolder',
  name: 'SignlePlaceHolder',
  label: 'SignlePlaceHolder',
  defaultOption: { id: 0, value: '기본1', label: '기본1' },
  options: [
    { id: 0, value: '기본1', label: '기본1' },
    { id: 1, value: '기본2', label: '기본2' },
    { id: 2, value: '기본3', label: '기본3' },
    { id: 3, value: '기본4', label: '기본4' },
  ],
};

export const MultiPlaceHolder = Template.bind({});
MultiPlaceHolder.args = {
  value: ['MultiPlaceHolder'],
  name: 'MultiPlaceHolder',
  label: 'MultiPlaceHolder',
  isMulti: true,
  defaultOption: { id: 0, value: '기본1', label: '기본1' },
  options: [
    { id: 0, value: '기본1', label: '기본1' },
    { id: 1, value: '기본2', label: '기본2' },
    { id: 2, value: '기본3', label: '기본3' },
    { id: 3, value: '기본4', label: '기본4' },
  ],
};

export const MultiPlaceHolderWithOverLine = Template.bind({});
MultiPlaceHolderWithOverLine.args = {
  value: [
    'MultiPlaceHolder',
    '기본2',
    '기본3',
    '기본4',
    '기본5',
    '기본6',
    '기본7',
    '기본8',
    '기본9',
  ],
  name: 'MultiPlaceHolder',
  label: 'MultiPlaceHolder',
  isMulti: true,
  defaultOption: { id: 0, value: '기본1', label: '기본1' },
  options: [
    { id: 0, value: '기본1', label: '기본1' },
    { id: 1, value: '기본2', label: '기본2' },
    { id: 2, value: '기본3', label: '기본3' },
    { id: 3, value: '기본4', label: '기본4' },
  ],
};

export const MultiPlaceHolderWithScroll = Template.bind({});
MultiPlaceHolderWithScroll.args = {
  value: ['MultiPlaceHolder'],
  name: 'MultiPlaceHolder',
  label: 'MultiPlaceHolder',
  isMulti: true,
  defaultOption: { id: 0, value: '기본1', label: '기본1' },
  options: [
    { id: 0, value: '기본1', label: '기본1' },
    { id: 1, value: '기본2', label: '기본2' },
    { id: 2, value: '기본3', label: '기본3' },
    { id: 3, value: '기본4', label: '기본4' },
    { id: 4, value: '기본5', label: '기본5' },
    { id: 5, value: '기본6', label: '기본6' },
    { id: 6, value: '기본7', label: '기본7' },
    { id: 7, value: '기본8', label: '기본8' },
    { id: 8, value: '기본9', label: '기본9' },
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
