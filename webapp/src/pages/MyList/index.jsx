import React, { useState } from 'react';
import Cards from 'components/CardsGrid';
import teamApi from 'api/team.api';
import userApi from 'api/user.api';
import Tabs from 'components/Common/Tabs';
import UserCard from 'components/UserCard';
import TeamCard from 'components/TeamCard';
import { ROUTE } from 'constant/route.constant';
import WithLoading from 'hoc/WithLoading';
import * as S from './style';

export default function MyList() {
  const [listTabId, setListTabId] = useState(LIKES_ID);
  const [postTabId, setPostTabId] = useState(USER_ID);

  const isUserList = postTabId === USER_ID;
  const CardComponent = isUserList ? UserCard : TeamCard;
  const clickLink = isUserList ? ROUTE.USER : ROUTE.TEAM;

  const activedFetcher = fetcherObj[postTabId][listTabId];

  const CardsView = WithLoading({
    Component: Cards,
    responseDataKey: 'cards',
    axiosInstance: activedFetcher,
    axiosConfig: {},
  });
  // * <Tabs tabs={POST_TYPE_TABS} activeTabId={postTabId} setActiveTab={setPostTabId} /> 이거는 사이드에 넣어주기!
  return (
    <S.Container>
      <S.SessionContainer>
        <Tabs tabs={LIST_TYPE_TABS} activeTabId={listTabId} setActiveTab={setListTabId} />
      </S.SessionContainer>
      <S.BoardContainer>
        <CardsView CardComponent={CardComponent} clickLink={`${clickLink}/`} />
      </S.BoardContainer>
    </S.Container>
  );
}

const LIKES_ID = 'like';
const READS_ID = 'read';
const USER_ID = 'user';
const TEAM_ID = 'team';

const LIST_TYPE_TABS = [
  { id: LIKES_ID, title: '내가 좋아요 한 글' },
  { id: READS_ID, title: '내가 읽은 글' },
];

// const POST_TYPE_TABS = [
//   { id: USER_ID, title: '유저' },
//   { id: TEAM_ID, title: '팀' },
// ];

const fetcherObj = {
  [USER_ID]: {
    [LIKES_ID]: userApi.GET_USER_LIKES,
    [READS_ID]: userApi.GET_USER_READS,
  },
  [TEAM_ID]: {
    [LIKES_ID]: teamApi.GET_TEAM_LIKES,
    [READS_ID]: teamApi.GET_TEAM_READS,
  },
};
