import React, { useState } from 'react';
import CheckInput from './index';

export default {
  title: 'common/CheckInput',
  component: CheckInput,
  args: {},
  layout: 'fullscreen',
};

function Template(args) {
  const [value, setValue] = useState('');
  const onChange = (event) => {
    setValue(event.target.value);
  };
  return <CheckInput value={value} onChange={onChange} {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  label: 'Check Input',
  name: 'CheckInput',
  value: false,
};

export const Checked = Template.bind({});
Checked.args = {
  label: 'Check Input',
  name: 'CheckInput',
  value: true,
};

export const customStyle = Template.bind({});
customStyle.args = {
  label: 'Check Input',
  name: 'CheckInput',
  value: true,
  width: '50px',
  height: '50px',
};
