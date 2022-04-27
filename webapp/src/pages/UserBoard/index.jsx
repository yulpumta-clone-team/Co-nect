import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from 'apiAction/user';
import UserCard from 'components/UserCard';
import Loader from 'components/Loader';
import UpperButton from 'components/UpperButton';
import CheckBox from 'components/CheckBox';
import NoDataMessage from 'components/NoDataMessage';
import useInfiniteScroll from 'hooks/useInfinitiScroll';
import useScrollLock from 'hooks/useScrollLock';
import useFilter from 'hooks/useFilter';
import useOrder from 'hooks/useOrder';
import uuid from 'react-uuid';
import { isStatusOk } from 'constant/serverStatus';
import { BoardWrapper } from './style';

function UserBoard() {
  const dispatch = useDispatch();
  const { userArray } = useSelector((state) => state.user);
  const [userList, setUserList] = useState(userArray);
  const [filteredLength, setFilteredLength] = useState(0);
  const fetchData = async (page) => {
    setLoading(true);
    const {
      payload: { status, code, data, message },
    } = await dispatch(getUserList({ page }));
    if (isStatusOk(status)) {
      !data || data?.length === 0
        ? setUserList((prev) => [...prev])
        : setUserList((prev) => [...prev, ...data]);
      setLoading(false);
    }
  };
  const [target, loading, setLoading] = useInfiniteScroll({ fetchData });
  const [checked, setChecked, handleFilter] = useFilter();
  const [likeOrder, setLikeOrder, handleOrder] = useOrder();
  const [setIsLock] = useScrollLock();
  useEffect(() => {
    setFilteredLength(handleFilter(userList).length);
  }, [checked, userList]);
  useEffect(() => {
    setIsLock(filteredLength === 0);
  }, [filteredLength]);

  return (
    <>
      <CheckBox
        checked={checked}
        setChecked={setChecked}
        likeOrder={likeOrder}
        setLikeOrder={setLikeOrder}
      />
      <BoardWrapper>
        {filteredLength === 0 ? (
          <NoDataMessage />
        ) : (
          handleOrder(userList, handleFilter).map((userElement) => (
            <UserCard key={uuid()} userInfo={{ ...userElement }} />
          ))
        )}
      </BoardWrapper>
      <div ref={target}>{loading && <Loader />}</div>
      <UpperButton />
    </>
  );
}

export default UserBoard;
