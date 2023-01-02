import CardsGrid from 'components/CardsGrid';
import UserCard from 'components/UserCard';
import { ROUTE } from 'constant/route.constant';
import { emptyTrigger } from 'constant/service.constant';
import handlers from 'mocks/handlers';
import { userList } from 'mocks/userHandler.mock/usersList';
import React from 'react';
import UserBoard from './index';

export default {
  title: 'pages/UserBoard',
  component: UserBoard,
  parameters: {
    layout: 'fullscreen',
    msw: handlers,
  },
};

function Template(args) {
  return <UserBoard {...args} />;
}

function EmptyTemplate(args) {
  return (
    <CardsGrid
      {...args}
      CardComponent={UserCard}
      clickLink={`${ROUTE.USER}/`}
      emptyTrigger={emptyTrigger.user}
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
  cards: userList,
  isLoading: true,
};
