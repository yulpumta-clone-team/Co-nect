import { useCallback, useEffect, useState } from 'react';

const useScrollLock = () => {
  const [isLock, setIsLock] = useState(false);
  const lockScroll = useCallback(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '17px';
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }, []);
  const handleLock = () => {
    if (isLock) {
      lockScroll();
    } else {
      unlockScroll();
    }
  };
  useEffect(() => {
    handleLock();
  }, [isLock]);
  return [setIsLock];
};

export default useScrollLock;
