import React, { useState, useEffect } from 'react';
import { getUserLikeList, getUserReadList } from 'apiAction/user';
import { getTeamLikeList, getTeamReadList } from 'apiAction/team';
import { handleFetcher } from 'utils';
import Cards from './Cards';
import * as S from './style';
import Tabs from './Tabs';

function MyList() {
  const [listTabId, setListTabId] = useState(LIKES_ID);
  const [postTabId, setPostTabId] = useState(USER_ID);
  const [cards, setCards] = useState([]);

  const fetcher = async (listId, postId) => {
    const activedFetcher = fetcherObj[postId][listId];
    const { value, isError, error } = await handleFetcher(activedFetcher);
    if (isError) {
      console.error(error);
    }
    setCards(value);
  };

  useEffect(() => {
    fetcher(listTabId, postTabId);
  }, [listTabId, postTabId]);

  return (
    <S.Container>
      <Tabs tabs={LIST_TYPE_TABS} activeTabId={listTabId} setActiveTab={setListTabId} />
      <Tabs tabs={POST_TYPE_TABS} activeTabId={postTabId} setActiveTab={setPostTabId} />
      <S.Cards>
        <Cards cards={cards} isUserList={postTabId === USER_ID} />
      </S.Cards>
    </S.Container>
  );
}

export default MyList;

const LIKES_ID = 'like';
const READS_ID = 'read';
const USER_ID = 'user';
const TEAM_ID = 'team';

const LIST_TYPE_TABS = [
  { id: LIKES_ID, title: '좋아요 누른 리스트' },
  { id: READS_ID, title: '읽은 목록' },
];

const POST_TYPE_TABS = [
  { id: USER_ID, title: '유저' },
  { id: TEAM_ID, title: '팀' },
];

const fetcherObj = {
  [USER_ID]: {
    [LIKES_ID]: getUserLikeList,
    [READS_ID]: getUserReadList,
  },
  [TEAM_ID]: {
    [LIKES_ID]: getTeamLikeList,
    [READS_ID]: getTeamReadList,
  },
};
