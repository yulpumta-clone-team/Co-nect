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

  const resetError = () => {
    setError({ isError: false, msg: '' });
    setCardList([]);
    setIsLoading(false);
  };

  const fetcher = async (signal) => {
    setIsLoading(true);
    try {
      const { data: responseCardList } = await axiosInstance({
        params: { lastPage: page.current },
        signal,
      });
      setCardList((prev) => [...prev, ...responseCardList]);
      page.current += 1;
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

  const refetcher = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    resetError();
    page.current = 0;
    fetcher();
  };

  const [loadMoreRef] = useIntersect(fetcher);

  /**
   * 타겟 요소의 display속성을 설정하는 함수: 에러 상황일 때 추가요청 방지 용도
   * @returns "none" : "block" 타겟요소의 display 속성
   */
  const observerRefDisplay = () => {
    if (error.isError) return 'none';
    return isLoading ? 'none' : 'block';
  };

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
      <div style={{ display: observerRefDisplay() }} ref={loadMoreRef}>
        {isLoading && !error.isError && <div>Loading...</div>}
      </div>
      <UpperButton />
    </>
  );
}
