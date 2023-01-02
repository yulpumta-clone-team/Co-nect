import React from 'react';
import Login from './index';

export default {
  title: 'Pages/Login',
  component: Login,
  args: {},
  layout: 'fullscreen',
};

function Template() {
  return <Login />;
}

export const Default = Template.bind({});
Default.args = {};
