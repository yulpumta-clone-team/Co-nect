import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import useIntersect from 'hooks/useIntersect';
import UpperButton from 'components/Common/UpperButton';
import Callback from 'pages/Callback';
import CardsGrid from 'components/CardsGrid';

WithInfiniteScroll.propTypes = {
  CardComponent: PropTypes.element.isRequired,
  clickLink: PropTypes.func.isRequired,
  axiosInstance: PropTypes.object.isRequired,
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
      page.current += 1;
    }
  };

  const refetcher = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    resetError();
    page.current = 0;
    fetcher();
  };

  const [loadMoreRef] = useIntersect(fetcher);
  if (error.isError)
    return (
      <Callback errorStatus={error.httpStatus} errorMessage={error.msg} forceRefetch={refetcher} />
    );

  return (
    <>
      <CardsGrid
        CardComponent={CardComponent}
        cards={cardList}
        clickLink={clickLink}
        emptyTrigger={emptyTrigger}
      />
      <div ref={loadMoreRef}>{isLoading && <div>Loading...</div>}</div>
      <UpperButton />
    </>
  );
}
