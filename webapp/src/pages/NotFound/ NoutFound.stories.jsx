import React from 'react';
import NotFound from './index';

export default {
  title: 'pages/NotFound',
  component: NotFound,
  layout: 'fullscreen',
};

function Template(args) {
  return <NotFound {...args} />;
}

export const Default = Template.bind({});
Default.args = {};
