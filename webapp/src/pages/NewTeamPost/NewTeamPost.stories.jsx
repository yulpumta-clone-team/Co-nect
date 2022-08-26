import React from 'react';
import NewTeamPost from './index';

export default {
  title: 'Pages/NewTeamPost',
  component: NewTeamPost,
  args: {},
  layout: 'fullscreen',
};

function Template() {
  return <NewTeamPost />;
}

export const Default = Template.bind({});
Default.args = {};
