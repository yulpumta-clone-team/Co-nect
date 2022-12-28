import React from 'react';
import NotAllow from './index';

export default {
  title: 'pages/NotAllow',
  component: NotAllow,
  layout: 'fullscreen',
};

function Template(args) {
  return <NotAllow {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  warnMessage: '⚠️경고문구⚠️',
};

export const Private = Template.bind({});
Private.args = {
  warnMessage: '로그인한 유저만 접속할 수 있습니다.',
};

export const Public = Template.bind({});
Public.args = {
  warnMessage: '로그인한 유저는 접근할 수 없어요. ',
};
