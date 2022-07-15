import { useCallback, useEffect, useRef, useState } from 'react';

const defaultOption = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};
function useIntersect(customOption) {
  const [page, setPage] = useState(0);
  const loadMoreRef = useRef(null);

  const handleObsever = useCallback(async ([entry], observer) => {
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
    return () => observer.current && observer.disconnect();
  }, [customOption, handleObsever, loadMoreRef]);
  return [loadMoreRef, page];
}

export default useIntersect;
