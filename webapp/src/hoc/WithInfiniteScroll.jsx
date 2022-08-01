import React, { useEffect, useState } from 'react';
import useIntersect from 'hooks/useIntersect';
import UpperButton from 'components/UpperButton';

/* eslint-disable react/no-unstable-nested-components */

export default function WithInfiniteScroll({ Component, responseDataKey, axiosInstance }) {
  return function Wrapper(props) {
    const [loadMoreRef, page, resetPage] = useIntersect();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState({ isError: false, msg: '' });
    const [cardList, setCardList] = useState([]);
    const IsShowLoadRef = isLoading || error.isError ? 'none' : 'block';

    const resetError = () => {
      setError({ isError: false, msg: '' });
      setCardList([]);
      setIsLoading(false);
    };

    const refetchData = async () => {
      resetError();
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      resetPage();
    };

    const fetchData = async (lastPage, signal) => {
      setIsLoading(true);
      try {
        const {
          status,
          data: { data },
        } = await axiosInstance({ params: { lastPage }, signal });
        setCardList((prev) => [...prev, ...data]);
      } catch (error) {
        console.error(error);
        setError({
          isError: true,
          msg: error,
        });
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      const controller = new AbortController();
      const { signal } = controller;
      fetchData(page, signal);
      return () => {
        controller.abort();
      };
    }, [page]);

    if (isLoading) return <div>Loading....</div>;

    if (error.isError)
      return (
        <div>
          <button onClick={() => {}}>refetch</button>
        </div>
      );

    const propsWithResponseData = { ...props, [responseDataKey]: cardList };
    return (
      <>
        <Component {...propsWithResponseData} />
        {error.isError && <button onClick={refetchData}>데이터 다시 요청</button>}
        <div ref={loadMoreRef} style={{ display: IsShowLoadRef }}>
          {isLoading && <div>Loading...</div>}
        </div>
        <UpperButton />
      </>
    );
  };
}
