import React from 'react';
import Main from './index';

export default {
  title: 'Pages/Main',
  component: Main,
  args: {},
  layout: 'fullscreen',
};

function Template() {
  return <Main />;
}

export const Default = Template.bind({});
Default.args = {};
