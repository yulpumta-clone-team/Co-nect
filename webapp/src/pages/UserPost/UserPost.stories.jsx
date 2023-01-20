import { createRandomUser } from 'mocks/userHandler.mock/user.mock';
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

const userDetail = createRandomUser();

export const Default = Template.bind({});
Default.args = {
  targetUser: userDetail,
};

export const NoTeamImage = Template.bind({});
NoTeamImage.args = {
  targetUser: { ...userDetail, profileImage: null },
};
