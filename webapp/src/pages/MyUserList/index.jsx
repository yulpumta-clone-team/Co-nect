import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import TeamCard from 'components/TeamCard';
import { getUserLikeList } from 'apiAction/user';
import Loader from 'components/Loader';
import UserCard from 'components/UserCard';
import * as S from './style';

const TABS = [
  { id: 0, title: '좋아요 누른 리스트' },
  { id: 1, title: '읽은 목록' },
];

function MyUserList() {
  const dispatch = useDispatch();
  const { userLikesArray } = useSelector((state) => state.user);
  const [targetTabId, setTargetTabId] = useState(0);
  console.log('userLikesArray :>> ', userLikesArray);

  const handleClickActiveTab = (id) => {
    setTargetTabId(id);
  };

  useEffect(() => {
    dispatch(getUserLikeList());
  }, []);

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
        {userLikesArray.length === 0 ? (
          <Loader />
        ) : (
          userLikesArray.map(({ id, ...userInfo }) => (
            <UserCard key={id} userInfo={{ ...userInfo, id }} />
          ))
        )}
      </S.Cards>
    </S.Container>
  );
}

export default MyUserList;
