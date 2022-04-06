import { useCallback, useState } from 'react';

const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const onCloseModal = useCallback((e) => {
    setShowModal(false);
  }, []);
  const openModal = useCallback(() => {
    setShowModal((prev) => !prev);
  }, []);
  return [showModal, onCloseModal, openModal];
};

export default useModal;
