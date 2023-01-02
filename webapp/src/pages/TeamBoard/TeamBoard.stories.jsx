import CardsGrid from 'components/CardsGrid';
import TeamCard from 'components/TeamCard';
import { ROUTE } from 'constant/route.constant';
import { emptyTrigger } from 'constant/service.constant';
import handlers from 'mocks/handlers';
import { teamsList } from 'mocks/teamHandler.mock/teamsList';
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

function EmptyTemplate(args) {
  return (
    <CardsGrid
      {...args}
      CardComponent={TeamCard}
      clickLink={`${ROUTE.TEAM}/`}
      emptyTrigger={emptyTrigger.team}
    />
  );
}

export const Default = Template.bind({});
Default.args = {};

export const Empty = EmptyTemplate.bind({});
Empty.args = {
  cards: [],
  isLoading: false,
};

export const LoadingWithSkeleton = EmptyTemplate.bind({});
LoadingWithSkeleton.args = {
  cards: teamsList,
  isLoading: true,
};
