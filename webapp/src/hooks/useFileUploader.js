import { useState } from 'react';
import etcApi from 'api/etc.api';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from 'constant/route.constant';

const useFileUploader = ({ notifyNewMessage, notifyDispatch }) => {
  const navigate = useNavigate();
  const [s3ImageId, setS3ImageId] = useState(null);
  const [s3ImageObj, setS3ImageObj] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const onChangeFile = (event) => {
    const targetImageFile = event.target.files[0];
    setImageFile(targetImageFile);
  };

  const uploadFileOnS3 = async (submitImageFile) => {
    // 둘다 없을 때 실행하지 않는다.
    if (!imageFile && !submitImageFile) {
      return null;
    }
    try {
      const formData = new FormData();
      if (submitImageFile) {
        formData.append('file', submitImageFile);
      } else {
        formData.append('file', imageFile);
      }
      const response = await etcApi.uploadImage(formData);
      const {
        data: { id, path },
      } = response;
      setS3ImageId(id);
      setS3ImageObj({ id, path });
      return { id, path };
    } catch (apiError) {
      console.error(apiError);
      setS3ImageObj(null);
      notifyNewMessage(notifyDispatch, apiError.message, TOAST_TYPE.Error);
      return null;
    }
  };

  const deleteFileOnS3 = async () => {
    try {
      const response = await etcApi.deleteImage();
      console.log('response :>> ', response);
    } catch (apiError) {
      console.error(apiError);
      notifyNewMessage(notifyDispatch, apiError.message, TOAST_TYPE.Error);
      navigate(ROUTE.ESSENTIAL_INFO.INDEX);
    }
  };

  return { imageFile, onChangeFile, s3ImageId, s3ImageObj, uploadFileOnS3, deleteFileOnS3 };
};

export default useFileUploader;
