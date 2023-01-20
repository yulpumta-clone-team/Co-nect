import { createRandomTeamCard } from 'mocks/teamHandler.mock/team.mock';
import React from 'react';
import TeamCard from './index';

import * as S from './TeamCard.style';

export default {
  title: 'Component/TeamCard',
  component: TeamCard,
  parameters: {
    layout: 'fullscreen',
  },
};

function Template(args) {
  return (
    <S.CardWrapper>
      <TeamCard {...args} />
    </S.CardWrapper>
  );
}

export const Default = Template.bind({});
Default.args = {
  cardInfo: createRandomTeamCard(),
};
