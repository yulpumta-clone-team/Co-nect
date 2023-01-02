import React, { useState } from 'react';
import TextArea from './index';

export default {
  title: 'Common/TextArea',
  component: TextArea,
  layout: 'center',
};

function Template(args) {
  const [value, setValue] = useState('');
  const onChange = (event) => {
    setValue(event.target.value);
  };
  return <TextArea value={value} onChange={onChange} {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  name: '기본',
  value: '',
  placeholder: 'TextArea placeholder',
};
