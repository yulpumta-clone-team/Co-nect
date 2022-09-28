import React from 'react';
import Like from './Like';

export default {
  title: 'Common/Like',
  component: Like,
  args: {},
  layout: 'centered',
};

function Template(args) {
  return <Like {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  like: false,
};
