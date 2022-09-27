import React, { useEffect, useState } from 'react';
import useIntersect from 'hooks/useIntersect';
import UpperButton from 'components/Common/UpperButton';

/* eslint-disable react/no-unstable-nested-components */

export default function WithInfiniteScroll({ Component, responseDataKey, axiosInstance }) {
  return function Wrapper(props) {
    const [loadMoreRef, page, resetPage] = useIntersect();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState({ isError: false, msg: '' });
    const [cardList, setCardList] = useState([]);
    const IsShowLoadRef = isLoading && error.isError ? 'block' : 'none'; // isLoading이 true이거나 isError가 true이면 ref엘리먼트를 보여주지 않음.
    const [trigger, setTrigger] = useState(Date.now());

    const resetError = () => {
      setError({ isError: false, msg: '' });
      setCardList([]);
      setIsLoading(false);
    };

    const refetcher = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      resetError();
      resetPage();
      setTrigger(Date.now());
    };

    const fetcher = async (lastPage, signal) => {
      setIsLoading(true);
      try {
        const { data: responseCardList } = await axiosInstance({ params: { lastPage }, signal });
        setCardList((prev) => [...prev, ...responseCardList]);
      } catch (error) {
        // src/api/errorHandler가 올바르게 작동하지 않은 경우 if문 실행
        if (typeof error !== 'string') {
          setError({
            isError: true,
            msg: '데이터를 가져오는 도중 에러가 발생했습니다. ',
          });
        } else {
          setError({
            isError: true,
            msg: error.message,
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      const controller = new AbortController();
      const { signal } = controller;
      fetcher(page, signal);
      return () => {
        controller.abort();
      };
    }, [page, trigger]);

    if (error.isError)
      return (
        <div>
          <h1>{error.msg}</h1>
          <button onClick={refetcher}>데이터 다시 요청</button>
        </div>
      );

    const propsWithResponseData = { ...props, [responseDataKey]: cardList };
    return (
      <>
        <Component {...propsWithResponseData} />
        <div
          ref={loadMoreRef}
          style={{ display: IsShowLoadRef, height: '100px', backgroundColor: 'tomato' }}
        >
          {isLoading && <div>Loading...</div>}
        </div>
        <UpperButton />
      </>
    );
  };
}
