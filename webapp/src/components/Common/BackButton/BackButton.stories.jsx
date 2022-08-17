import React from 'react';
import BackButton from './index';

export default {
  title: 'common/BackButton',
  component: BackButton,
  args: {},
  layout: 'fullscreen',
};

function Template(args) {
  return <BackButton {...args} />;
}

export const Default = Template.bind({});
Default.args = {};
