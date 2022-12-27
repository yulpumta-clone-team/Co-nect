import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import useIntersect from 'hooks/useIntersect';
import UpperButton from 'components/Common/UpperButton';
import Callback from 'pages/Callback';
import CardsGrid from 'components/CardsGrid';

WithInfiniteScroll.propTypes = {
  CardComponent: PropTypes.func.isRequired,
  clickLink: PropTypes.string.isRequired,
  axiosInstance: PropTypes.func.isRequired,
  emptyTrigger: PropTypes.shape({
    emptyMessage: PropTypes.string.isRequired,
    triggerLink: PropTypes.string.isRequired,
    triggerMessage: PropTypes.string.isRequired,
  }),
};

const DISPLAY = {
  block: 'block',
  none: 'none',
};

export default function WithInfiniteScroll({
  CardComponent,
  clickLink,
  axiosInstance,
  emptyTrigger,
}) {
  const page = useRef(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, msg: '' });
  const [cardList, setCardList] = useState([]);
  const [refDisplay, setRefDisplay] = useState(DISPLAY.block);

  const resetError = () => {
    setError({ isError: false, msg: '' });
    setCardList([]);
    setIsLoading(false);
  };

  const fetcher = async (signal) => {
    setIsLoading(true);
    setRefDisplay(DISPLAY.none);
    try {
      const { data: responseCardList } = await axiosInstance({
        params: { lastPage: page.current },
        signal,
      });
      // api요청으로 받은 배열의 길이가 0이면 추가요청하지 못하게 ref를 숨기기
      if (responseCardList.length === 0) {
        setRefDisplay(DISPLAY.none);
        return;
      }
      setCardList((prev) => [...prev, ...responseCardList]);
      page.current += 1;
      setRefDisplay(DISPLAY.block);
    } catch (error) {
      // src/api/errorHandler가 올바르게 작동하지 않은 경우 if문 실행
      setRefDisplay(DISPLAY.none);
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

  const refetcher = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    resetError();
    page.current = 0;
    fetcher();
  };

  const [loadMoreRef] = useIntersect(fetcher);
  return (
    <>
      {error.isError ? (
        <Callback
          errorStatus={error.httpStatus}
          errorMessage={error.msg}
          forceRefetch={refetcher}
        />
      ) : (
        <CardsGrid
          CardComponent={CardComponent}
          cards={cardList}
          clickLink={clickLink}
          emptyTrigger={emptyTrigger}
        />
      )}
      <div style={{ display: refDisplay }} ref={loadMoreRef}>
        {isLoading && !error.isError && <div>Loading...</div>}
      </div>
      <UpperButton />
    </>
  );
}
