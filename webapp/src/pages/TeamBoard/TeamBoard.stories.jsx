import handlers from 'mocks/handlers';
import React from 'react';
import TeamBoard from './index';

export default {
  title: 'pages/TeamBoard',
  component: TeamBoard,
  parameters: {
    layout: 'fullscreen',
    msw: handlers,
  },
};

function Template(args) {
  return <TeamBoard {...args} />;
}

export const Default = Template.bind({});
Default.args = {};
