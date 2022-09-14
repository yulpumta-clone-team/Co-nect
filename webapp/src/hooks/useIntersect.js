import { useCallback, useEffect, useRef, useState } from 'react';

const defaultOption = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

// FIXME: react hooks return 타입을 jsdoc로 만들 수 없다.. 추론이 안되네요. object로 변경 필요

/**
 * useIntersect를 사용하는 곳에서 사용할 method 및 state
 * @typedef useIntersectReturns
 * @type {Array}
 * @property {Object} loadMoreRef root에 등록할 useRef 객체
 * @property {number} page 증가할 page 숫자
 * @property {() => void} resetPage page를 0으로 만드는 함수
 */

/**
 * IntersectionObserver를 사용하기 위한 custom hoooks
 * @param {Object} customOption  IntersectionObserver인스턴스를 생성하기 위한 option (root, rootMargin,threshold)  https://developer.mozilla.org/ko/docs/Web/API/IntersectionObserver/IntersectionObserver
 * @returns {useIntersectReturns}  useIntersect를 사용하는 곳에서 사용할 method 및 state
 */
function useIntersect(customOption) {
  const [page, setPage] = useState(0);
  const loadMoreRef = useRef(null);

  const resetPage = () => {
    setPage(0);
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
