import React from 'react';
<<<<<<< HEAD
=======
import WindowModal from 'components/WindowModal';
import useModal from 'hooks/useModal';
>>>>>>> back
import ImageUploader from 'components/ImageUploader';

export default function Main() {
  return (
    <div>
      <h1>Main</h1>
      <ImageUploader />
<<<<<<< HEAD
=======
      <button onClick={openModal}>Open Modal</button>
      <WindowModal show={showModal} onCloseModal={onCloseModal}>
        <div>
          <h1>this is modal</h1>
          <p>modal content</p>
        </div>
      </WindowModal>
>>>>>>> back
    </div>
  );
}
