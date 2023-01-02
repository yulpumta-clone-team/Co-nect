import React from 'react';
import UpperButton from './index';

export default {
  title: 'Common/UpperButton',
  component: UpperButton,
  layout: 'centered',
};

function Template(args) {
  return <UpperButton {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  initShow: true,
};
