import ToastNotificationProvider from 'contexts/ToastNotification';
import WithProvider from 'hoc/withProvider';
import React from 'react';
import Login from './index';

const WithToastLogin = WithProvider({ Provider: ToastNotificationProvider, Component: Login });

export default {
  title: 'Pages/Login',
  component: WithToastLogin,
  args: {},
  layout: 'fullscreen',
};

function Template() {
  return <WithToastLogin />;
}

export const Default = Template.bind({});
Default.args = {};
