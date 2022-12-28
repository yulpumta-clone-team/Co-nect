import React from 'react';
import OauthFail from './index';

export default {
  title: 'pages/OauthFail',
  component: OauthFail,
  args: {},
  layout: 'fullscreen',
};

function Template(args) {
  return <OauthFail {...args} />;
}

export const Default = Template.bind({});
Default.args = {};
