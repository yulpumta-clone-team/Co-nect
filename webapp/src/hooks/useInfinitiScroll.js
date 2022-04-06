import { useCallback, useEffect, useRef, useState } from 'react';

function useInfiniteScroll({ fetchData }) {
  const [page, setPage] = useState(1);
  const target = useRef(null);
  const [loading, setLoading] = useState(false);

  const fetchMore = () => {
    setLoading(true);
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  const handleObsever = useCallback(
    async ([entry], observer) => {
      if (!entry.isIntersecting || !target) {
        // console.log('화면에서 제외됨');
        return;
      }
      // console.log('화면에서 노출됨');
      observer.unobserve(entry.target);
      !loading && fetchMore();
      observer.observe(target.current);
    },
    [loading],
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };
    let observer;
    if (!loading && target) {
      observer = new IntersectionObserver(handleObsever, option);
      observer.observe(target.current);
    }
    return () => observer.current && observer.disconnect();
  }, [target]);
  useEffect(() => {
    fetchData(page);
  }, [page]);
  return [target, loading, setLoading];
}

export default useInfiniteScroll;
