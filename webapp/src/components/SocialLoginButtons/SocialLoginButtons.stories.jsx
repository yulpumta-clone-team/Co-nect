import React from 'react';
import SocialLoginButtons from './index';

export default {
  title: 'Component/SocialLoginButtons',
  component: SocialLoginButtons,
  layout: 'fullscreen',
};

function Template(args) {
  return <SocialLoginButtons {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  children: '소셜계정으로 회원가입',
};
