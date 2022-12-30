import React from 'react';
import Spinner from './index';

export default {
  title: 'component/Spinner',
  component: Spinner,
  args: {},
  layout: 'fullscreen',
};

function Template(args) {
  return <Spinner {...args} />;
}

export const Default = Template.bind({});
Default.args = {};

export const WithLogo = Template.bind({});
WithLogo.args = {
  withLogo: true,
  isFullPage: false,
};

export const WithFullPage = Template.bind({});
WithFullPage.args = {
  withLogo: true,
  isFullPage: true,
};
