import { useState, useEffect, useRef } from 'react';

const usePopup = (initialMode) => {
  const parent = useRef();

  const [isPopupOpen, setIsPopupOpen] = useState(initialMode);

  const handleModalClick = (event) => {
    for (const element of event.composedPath()) {
      if (element === parent.current) return;
    }
    setIsPopupOpen(false);
  };

  const openPopUp = () => setIsPopupOpen(true);

  useEffect(() => {
    window.addEventListener('click', handleModalClick, true);

    return () => {
      window.removeEventListener('click', handleModalClick, true);
    };
  }, [parent]);
  return [parent, isPopupOpen, openPopUp, handleModalClick];
};

export default usePopup;
