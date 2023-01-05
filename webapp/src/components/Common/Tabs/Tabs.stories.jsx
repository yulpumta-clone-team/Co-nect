import React from 'react';
import Tabs from './index';

export default {
  title: 'Common/Tabs',
  component: Tabs,
  args: {},
  layout: 'fullscreen',
};

function Template(args) {
  return <Tabs {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  type: 'domain',
  tabs: [
    {
      id: 'TEAM',
      title: '팀',
    },
    {
      id: 'USER',
      title: '유저',
    },
  ],
  activeId: 'USER',
  onClickTab: () => {},
};
