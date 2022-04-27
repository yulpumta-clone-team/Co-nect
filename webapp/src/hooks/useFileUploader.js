import axios from 'axios';
import { useCallback, useState } from 'react';

const useFileUploader = (initialValue) => {
  const [file, setFile] = useState(initialValue);
  console.log('file', file);
  const fileHandler = useCallback(async (event) => {
    const imageFile = event.target.files[0];
    if (imageFile.size > 10000) {
      alert('10mb이상');
      return;
    }
    const formData = new FormData();
    formData.append('file', imageFile);
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_API}upload`, formData, {
        headers: {
          'Access-Control-Allow-Origin': process.env.REACT_APP_SERVER_API,
          'content-type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }, []);
  return [file, fileHandler, setFile];
};

export default useFileUploader;
