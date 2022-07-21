import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import useIntersect from 'hooks/useIntersect';
import CardsGrid from 'components/CardsGrid';
import UpperButton from 'components/UpperButton';

WithInfiniteScroll.propTypes = {
  CardComponent: PropTypes.func.isRequired,
  axiosInstance: PropTypes.func.isRequired,
  clickLink: PropTypes.string.isRequired,
};

export default function WithInfiniteScroll({ CardComponent, axiosInstance, clickLink }) {
  const [loadMoreRef, page, resetPage] = useIntersect();
  const [isLoading, setIsLoading] = useState(false);
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

  return (
    <>
      <CardsGrid cards={cardList} CardComponent={CardComponent} clickLink={clickLink} />
      {error.isError && <button onClick={refetchData}>데이터 다시 요청</button>}
      <div ref={loadMoreRef} style={{ display: IsShowLoadRef }}>
        {isLoading && <div>Loading...</div>}
      </div>
      <UpperButton />
    </>
  );
}
