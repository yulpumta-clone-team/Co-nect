import React from 'react';
import TeamBoard from './index';

import * as S from './style';

export default {
  title: 'pages/TeamBoard',
  component: TeamBoard,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

function Template(args) {
  return <TeamBoard {...args} />;
}

// function

export const Default = Template.bind({});
Default.args = {};
