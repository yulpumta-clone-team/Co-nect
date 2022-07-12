import React, { useState } from 'react';
import SignUp from 'pages/SignUp';

export default function Modalbutton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    return setIsModalOpen(true);
  };

  const closeModal = () => {
    return setIsModalOpen(false);
  };
  return (
    <>
      <button onClick={openModal}>Modal Open</button>
      <SignUp isOpen={isModalOpen} close={closeModal} />
    </>
  );
}
