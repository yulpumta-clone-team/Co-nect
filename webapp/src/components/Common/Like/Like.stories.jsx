import handlers from 'mocks/handlers';
import React from 'react';
import Like from './index';

export default {
  title: 'Common/Like',
  component: Like,
  parameters: {
    msw: handlers,
  },
  layout: 'centered',
};

function Template(args) {
  return <Like {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  initValue: false,
};

export const Active = Template.bind({});
Default.args = {
  initValue: true,
};
