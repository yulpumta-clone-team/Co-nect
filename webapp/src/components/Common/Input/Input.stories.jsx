import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from './index';

export default {
  title: 'Common/Input',
  component: Input,
};

Template.propTypes = {
  register: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

function Template(args) {
  const [value, setValue] = useState('');
  const onChange = (event) => {
    setValue(event.target.value);
  };
  return <Input value={value} onChange={onChange} {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  name: 'Default',
  placeholder: 'Default',
};

export const WithError = Template.bind({});
WithError.args = {
  name: 'Error',
  placeholder: 'Error',
  isError: true,
  helperText: '에러 입니다.',
};
