import { useState } from 'react';

const useFileInput = () => {
  const [imageFile, setImageFile] = useState(null);

  const fileHandler = (event) => {
    const imageFile = event.target.files[0];
    setImageFile(imageFile);
  };

  return { imageFile, fileHandler, setImageFile };
};

export default useFileInput;
