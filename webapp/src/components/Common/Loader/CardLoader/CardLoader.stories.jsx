import React from 'react';
import CardLoader from './index';

export default {
  title: 'Component/CardLoader',
  component: CardLoader,
  args: {},
  layout: 'fullscreen',
};

function Template(args) {
  return <CardLoader {...args} />;
}

export const Default = Template.bind({});
Default.args = {};
