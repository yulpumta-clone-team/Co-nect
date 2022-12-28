import React from 'react';
import NoutFound from './index';

export default {
  title: 'pages/NoutFound',
  component: NoutFound,
  layout: 'fullscreen',
};

function Template(args) {
  return <NoutFound {...args} />;
}

export const Default = Template.bind({});
Default.args = {};
