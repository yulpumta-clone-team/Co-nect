import handlers from 'mocks/handlers';
import React from 'react';
import MyList from './index';

export default {
  title: 'pages/MyList',
  component: MyList,
  args: {},
  parameters: {
    msw: handlers,
  },
  layout: 'fullscreen',
};

function Template(args) {
  return <MyList {...args} />;
}

export const Default = Template.bind({});
Default.args = {};
