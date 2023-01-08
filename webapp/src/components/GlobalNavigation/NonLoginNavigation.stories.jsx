import React from 'react';
import NonLoginNavigation from './NonLoginNav';

import * as S from './GlobalNavigation.style';

export default {
  title: 'Component/NonLoginNavigation',
  component: NonLoginNavigation,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

function Template(args) {
  return (
    <S.Container>
      <NonLoginNavigation {...args} />
    </S.Container>
  );
}

// function

export const Default = Template.bind({});
Default.args = {};
