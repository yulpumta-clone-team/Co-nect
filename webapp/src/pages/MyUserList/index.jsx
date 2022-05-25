import React, { useState, useEffect } from 'react';
import { getUserLikeList, getUserReadList } from 'apiAction/user';
import { handleFetcher } from 'utils';
import Cards from './Cards';
import * as S from './style';

const LIKES_ID = 0;
const READS_ID = 1;

const TABS = [
  { id: LIKES_ID, title: '좋아요 누른 리스트' },
  { id: READS_ID, title: '읽은 목록' },
];

function MyUserList() {
  const [targetTabId, setTargetTabId] = useState(LIKES_ID);
  const [userList, setUserList] = useState([]);

  const isLikesActive = (tabId) => tabId === LIKES_ID;

  const activeRequestType = (tabId) => (isLikesActive(tabId) ? getUserLikeList : getUserReadList);

  const handleClickActiveTab = (id) => {
    setTargetTabId(id);
  };

  const fetcher = async (tabId) => {
    const { value, isError, error } = await handleFetcher(activeRequestType(tabId));
    if (isError) {
      console.error(error);
    }
    setUserList(value);
  };

  useEffect(() => {
    fetcher(targetTabId);
  }, [targetTabId]);

  return (
    <S.Container>
      <S.Tabs>
        {TABS.map(({ id, title }) => (
          <S.Tab key={id} isActive={id === targetTabId} onClick={() => handleClickActiveTab(id)}>
            {title}
          </S.Tab>
        ))}
      </S.Tabs>
      <S.Cards>
        <Cards cards={userList} />
      </S.Cards>
    </S.Container>
  );
}

export default MyUserList;
