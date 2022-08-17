import React from 'react';
import EssentailInfo from './index';

export default {
  title: 'pages/EssentailInfo',
  component: EssentailInfo,
  args: {},
  layout: 'fullscreen',
};

function Template(args) {
  return <EssentailInfo {...args} />;
}

export const Default = Template.bind({});
Default.args = {};
