import ToastNotificationProvider from 'contexts/ToastNotification';
import WithProvider from 'hoc/withProvider';
import React from 'react';
import SignUp from './index';

const WithToastSignUp = WithProvider({ Provider: ToastNotificationProvider, Component: SignUp });

export default {
  title: 'Pages/SignUp',
  component: WithToastSignUp,
  args: {},
  layout: 'fullscreen',
};

function Template() {
  return <WithToastSignUp />;
}

export const Default = Template.bind({});
Default.args = {};
