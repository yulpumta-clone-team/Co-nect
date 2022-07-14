import React, { useState } from 'react';
import SignUp from 'pages/SignUp';

export default function Modalbutton() {
  // const [isModalOpen, openModal, closeModal] = useModal(false, true, false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    return setIsModalOpen(true);
  };

  const closeModal = () => {
    return setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={openModal}>Sign up</button>
      <SignUp isOpen={isModalOpen} close={closeModal} />
    </>
  );
}
