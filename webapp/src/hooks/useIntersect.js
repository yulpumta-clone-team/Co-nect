import { useCallback, useEffect, useRef, useState } from 'react';

const defaultOption = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};
function useIntersect(customOption) {
  const [page, setPage] = useState(0);
  const loadMoreRef = useRef(null);

  const resetPage = () => {
    setPage((prev) => 0);
  };

  const handleObsever = useCallback(async ([entry]) => {
    if (entry.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    let observer;
    if (loadMoreRef.current) {
      observer = new IntersectionObserver(handleObsever, { ...defaultOption, ...customOption });
      observer.observe(loadMoreRef.current);
    }
    return () => {
      if (observer) {
        observer.current && observer.disconnect();
      }
    };
  }, [customOption, handleObsever, loadMoreRef]);
  return [loadMoreRef, page, resetPage];
}

export default useIntersect;
