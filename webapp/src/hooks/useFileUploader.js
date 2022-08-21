import { useState } from 'react';

const useFileUploader = () => {
  const [imageFile, setImageFile] = useState(null);

  const fileHandler = (event) => {
    const imageFile = event.target.files[0];
    // if (imageFile.size > 10000) {
    //   alert('10mb이상');
    //   return;
    // }
    setImageFile(imageFile);
  };

  return { imageFile, fileHandler, setImageFile };
};

export default useFileUploader;
