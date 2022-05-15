import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLikeList, getUserReadList } from 'apiAction/user';
import Cards from './Cards';
import * as S from './style';

const LIKES_ID = 0;
const READS_ID = 1;

const TABS = [
  { id: LIKES_ID, title: '좋아요 누른 리스트' },
  { id: READS_ID, title: '읽은 목록' },
];

function MyUserList() {
  const dispatch = useDispatch();
  const { userLikesArray, userReadArray } = useSelector((state) => state.user);
  const [targetTabId, setTargetTabId] = useState(LIKES_ID);

  const isLikesActive = (tabId) => tabId === LIKES_ID;

  const activeList = (tabId) => (isLikesActive(tabId) ? userLikesArray : userReadArray);

  const activeDispatch = (tabId) => (isLikesActive(tabId) ? getUserLikeList() : getUserReadList());

  const handleClickActiveTab = (id) => {
    setTargetTabId(id);
  };

  useEffect(() => {
    dispatch(activeDispatch(targetTabId));
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
        <Cards cards={activeList(targetTabId)} />
      </S.Cards>
    </S.Container>
  );
}

export default MyUserList;
