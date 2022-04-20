import uploadApi from 'api/upload';
import axios from 'axios';
import { AUTH_KEY } from 'constant';
import { useCallback, useState } from 'react';
import { getAuthCookie } from 'utils/cookie';

const useFileUploader = (initialValue) => {
  const [file, setFile] = useState(initialValue);
  // const [file, setfile] = useState(second)
  const FileHandler = useCallback(
    async (e) => {
      const imageFile = e.target.files[0];
      if (imageFile.size > 10000) {
        alert('10mb이상');
        return;
      }
      const formData = new FormData();
      formData.append('file', imageFile);
      const res = await axios.post(`${process.env.REACT_APP_SERVER_API}upload`, formData, {
        headers: {
          'Access-Control-Allow-Origin': process.env.REACT_APP_SERVER_API,
          'content-type': 'multipart/form-data',
          [AUTH_KEY]: getAuthCookie(),
        },
        withCredentials: true,
      });
      console.log(res);
    },
    [file],
  );
  return [file, FileHandler, setFile];
};

export default useFileUploader;
