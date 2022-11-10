import { userDetail } from 'mocks/userHandler.mock/userDetail';
import React from 'react';
import UserPost from './UserPostDetail';

export default {
  title: 'pages/UserPost',
  component: UserPost,
  args: {},
  layout: 'fullscreen',
};

function Template(args) {
  return <UserPost {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  targetUser: userDetail,
};

export const NoTeamImage = Template.bind({});
NoTeamImage.args = {
  targetUser: { ...userDetail, profileImage: null },
};
