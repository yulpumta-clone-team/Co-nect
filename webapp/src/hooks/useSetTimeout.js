import { useEffect, useRef } from 'react';

/**
 * setTimout를 사용하기 위한 hooks
 * @param {callback} timeoutCallback seconds 이후에 실행할 callback함수
 * @param {number} seconds 몇초뒤에 실행할지 1000단위 숫자
 */
const useSetTimeout = (timeoutCallback, seconds) => {
  const timeoutId = useRef();

  useEffect(() => {
    timeoutId.current = setTimeout(timeoutCallback, seconds);
    return () => clearTimeout(timeoutId.current);
  }, []);
};

export default useSetTimeout;
