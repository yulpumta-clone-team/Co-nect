import { useCallback, useState } from 'react';

const useFileUploader = () => {
  const [imageFile, setImageFile] = useState(null);

  const fileHandler = (event) => {
    const imageFile = event.target.files[0];
    // if (imageFile.size > 10000) {
    //   alert('10mb이상');
    //   return;
    // }
    const formData = new FormData();
    formData.append('file', imageFile);
    // FormData값확인
    for (const key of formData.keys()) {
      console.log('제출할 데이터', formData.get(key));
    }
    try {
      setImageFile(imageFile);
    } catch (error) {
      console.error(error);
    }
  };

  return { imageFile, fileHandler, setImageFile };
};

export default useFileUploader;
