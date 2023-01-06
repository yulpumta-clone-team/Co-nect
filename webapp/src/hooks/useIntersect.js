import { useEffect, useRef } from 'react';

const defaultOption = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1,
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
 * IntersectionObserver를 사용하기 위한 custom hooks
 * @param {callback} callback 바라보고 있는 요소가 교차할 때(isIntersecting) 실행할 callback함수
 * @param {Object} customOption  IntersectionObserver인스턴스를 생성하기 위한 option (root, rootMargin,threshold)  https://developer.mozilla.org/ko/docs/Web/API/IntersectionObserver/IntersectionObserver
 * @returns {useIntersectReturns}  useIntersect를 사용하는 곳에서 사용할 method 및 state
 */
export default function useIntersect(callback, customOption) {
  const loadMoreRef = useRef(null);

  const handleObserver = async ([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      await callback();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    if (loadMoreRef.current) {
      observer = new IntersectionObserver(handleObserver, { ...defaultOption, ...customOption });
      observer.observe(loadMoreRef.current);
    }
    return () => observer && observer.current && observer.disconnect();
  }, [customOption, loadMoreRef]);
  return [loadMoreRef];
}
