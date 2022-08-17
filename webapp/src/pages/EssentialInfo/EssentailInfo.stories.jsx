import React from 'react';
import EssentailInfo from './index';
import Nickname from './Nickname';

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

export const NicknameModal = Template.bind({});
Nickname.args = {
  children: Nickname,
};
