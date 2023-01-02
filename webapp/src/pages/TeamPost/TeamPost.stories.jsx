import { teamDetail } from 'mocks/teamHandler.mock/teamDetail';
import React from 'react';
import TeamPost from './TeamPostDetail';

export default {
  title: 'pages/TeamPost',
  component: TeamPost,
  args: {},
  layout: 'fullscreen',
};

function Template(args) {
  return <TeamPost {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  targetTeam: teamDetail,
};

export const NoTeamImage = Template.bind({});
NoTeamImage.args = {
  targetTeam: { ...teamDetail, teamImage: null },
};
