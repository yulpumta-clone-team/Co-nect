import { useToastNotificationAction } from 'contexts/ToastNotification';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import { useState } from 'react';
import etcApi from 'api/etc.api';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from 'constant/route.constant';
import useAuthService from './useAuthService';

/**
 * useFileUploader를 사용하는 곳에서 사용할 method 및 state
 * @typedef {Object} useFileUploaderReturns
 * @property {string} imageFile isLoading, responseData, error로 구성
 * @property {(Event) => void} onChangeFile 새로운 axios config와 함께 api호출을 실행하는 함수
 * @property {string} s3ImageId 기존 axios config로 같은 api호출을 실행하는 함수
 * @property {Object} s3ImageObj id: s3ImageId, path: /image/:s3ImageId
 * @property {(submitImageFile: File) => Promise<{id: string, path: string} | null>} uploadFileOnS3 s3에 이미지 업로드 요청하는 함수
 * @property {() => Promise<void>} deleteFileOnS3  s3에 올라간 이미지를 제거 요청하는 함수
 */

/**
 * 파일 업로드 (s3)를 위한 cutom hooks
 * @returns {useFileUploaderReturns} useFileUploader를 사용하는 곳에서 사용할 method 및 state
 */
const useFileUploader = () => {
  const notifyDispatch = useToastNotificationAction();
  const navigate = useNavigate();
  const { handleExiredToken } = useAuthService();
  const [s3ImageId, setS3ImageId] = useState(null);
  const [s3ImageObj, setS3ImageObj] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  /**
   * input[type="file"]을 변경을 위한 change handler
   * @param {Event}
   */
  const onChangeFile = (event) => {
    const targetImageFile = event.target.files[0];
    setImageFile(targetImageFile);
  };

  /**
   * s3에 이미지 업로드 요청하는 함수
   * @param {File} 새롭게 제출할 이미지 파일
   * @returns {Promise<void>}
   */
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
      handleExiredToken(apiError.httpStatus);
      notifyNewMessage(notifyDispatch, apiError.message, TOAST_TYPE.Error);
      return null;
    }
  };

  // FIXME: 아직 구현 안 됨. 백엔드랑 얘기하고 수정해야함.
  /**
   * s3에 올라간 이미지를 제거 요청하는 함수
   * @returns {Promise<void>}
   */
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
