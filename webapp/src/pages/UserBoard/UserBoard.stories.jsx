import handlers from 'mocks/handlers';
import React from 'react';
import UserBoard from './index';

export default {
  title: 'pages/UserBoard',
  component: UserBoard,
  parameters: {
    layout: 'fullscreen',
    msw: handlers,
  },
};

function Template(args) {
  return <UserBoard {...args} />;
}

export const Default = Template.bind({});
Default.args = {};
