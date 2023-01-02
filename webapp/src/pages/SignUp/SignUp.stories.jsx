import React from 'react';
import SignUp from './index';

export default {
  title: 'Pages/SignUp',
  component: SignUp,
  args: {},
  layout: 'fullscreen',
};

function Template() {
  return <SignUp />;
}

export const Default = Template.bind({});
Default.args = {};
