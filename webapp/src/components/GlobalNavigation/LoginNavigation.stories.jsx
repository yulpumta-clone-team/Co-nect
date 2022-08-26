import ToastNotificationProvider from 'contexts/ToastNotification';
import React from 'react';
import { loggedUserType } from 'types/user.type';
import LoginNavigation from './LoginNav';

import * as S from './style';

export default {
  title: 'Component/LoginNavigation',
  component: LoginNavigation,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

Template.propTypes = {
  userInfo: loggedUserType.isRequired,
};

function Template(args) {
  return (
    <ToastNotificationProvider>
      <S.Container>
        <LoginNavigation {...args} />
      </S.Container>
    </ToastNotificationProvider>
  );
}

// function

export const Default = Template.bind({});
Default.args = {
  userInfo: {
    id: '1aafaf21',
    nickname: 'User name',
    profileImg:
      'https://user-images.githubusercontent.com/71386219/157435570-a48382a8-63e5-4d25-91f4-e506289424b5.png',
  },
};
