import { useEffect, useRef } from 'react';

/**
 * setInterval을 사용하기 위한 hooks
 * @param {callback} timeoutCallback seconds마다 실행할 callback함수
 * @param {number} seconds 몇초마다 실행할지 1000단위 숫자
 */
const useSetInterval = (timeoutCallback, seconds) => {
  const savedCallback = useRef();

  const tick = () => savedCallback.current();

  useEffect(() => {
    savedCallback.current = timeoutCallback;
  }, [timeoutCallback]);

  useEffect(() => {
    const id = setInterval(tick, seconds);
    return () => clearInterval(id);
  }, [seconds]);
};

export default useSetInterval;
