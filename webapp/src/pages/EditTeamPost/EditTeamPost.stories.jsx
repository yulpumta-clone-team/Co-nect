import handlers from 'mocks/handlers';
import React from 'react';
import EditTeamPost from './index';

export default {
  title: 'pages/EditTeamPost',
  component: EditTeamPost,
  parameters: {
    msw: handlers,
  },
  layout: 'fullscreen',
};

function Template(args) {
  return <EditTeamPost {...args} />;
}

export const Default = Template.bind({});
Default.args = {};
