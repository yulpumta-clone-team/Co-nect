import React from 'react';
import NewTeamPost from './index';

export default {
  title: 'Pages/NewTeamPost',
  component: NewTeamPost,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

// NewTeamPost 초반에 프로필 이미지와 작성자 이름을 불러와야하기 때문에 이 또한 storybook으로 작동이 어렵습니다.
// page 수정 필요
function Template() {
  return <NewTeamPost />;
}

export const Default = Template.bind({});
Default.args = {};
