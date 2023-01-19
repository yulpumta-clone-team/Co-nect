import { useState } from 'react';

const useModal = (initMode = false) => {
  const [isModalOpen, setIsModalOpen] = useState(initMode);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);
  return [isModalOpen, closeModal, openModal];
};

export default useModal;
