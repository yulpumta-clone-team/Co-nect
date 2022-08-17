import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextInput from './index';

export default {
  title: 'Common/TextInput',
  component: TextInput,
  layout: 'centered',
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
  return <TextInput value={value} onChange={onChange} {...args} />;
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
