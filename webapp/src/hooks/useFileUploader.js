import { useCallback, useState } from 'react';

const useFileUploader = (initialValue) => {
  const [file, setFile] = useState(initialValue);
  const fileHandler = useCallback(async (event) => {
    const imageFile = event.target.files[0];
    if (imageFile.size > 10000) {
      alert('10mb이상');
      return;
    }
    const formData = new FormData();
    formData.append('file', imageFile);
    // FormData값확인
    for (const key of formData.keys()) {
      console.log('제출할 데이터', formData.get(key));
    }
    try {
      console.log();
    } catch (error) {
      console.error(error);
    }
  }, []);
  return [file, fileHandler, setFile];
};

export default useFileUploader;
