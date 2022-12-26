import CardsGrid from 'components/CardsGrid';
import TeamCard from 'components/TeamCard';
import { ROUTE } from 'constant/route.constant';
import { emptyTrigger } from 'constant/service.constant';
import handlers from 'mocks/handlers';
import React from 'react';
import TeamBoard from './index';

export default {
  title: 'pages/TeamBoard',
  component: TeamBoard,
  parameters: {
    layout: 'fullscreen',
    msw: handlers,
  },
};

function Template(args) {
  return <TeamBoard {...args} />;
}

function EmptyTemplate() {
  return (
    <CardsGrid
      CardComponent={TeamCard}
      cards={[]}
      clickLink={`${ROUTE.TEAM}/`}
      emptyTrigger={emptyTrigger.team}
    />
  );
}

export const Default = Template.bind({});
Default.args = {};

export const Empty = EmptyTemplate.bind({});
Empty.args = {};
