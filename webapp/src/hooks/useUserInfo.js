import userApi from 'api/user.api';
import { ROUTE } from 'constant/route.constant';
import { useToastNotificationAction } from 'contexts/ToastNotification';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import { useNavigate } from 'react-router-dom';
import { updateUserInfo, deleteUserInfo } from 'service/auth';

/**
 * useUserInfo를 사용하는 곳에서 사용할 method 및 state
 * @typedef {Object} useUserInfoReturns
 * @property {() => Promise<void>} handleUpdateUserInfo 유저정보를 새롭게 요청하고 updateUserInfo service함수 실행
 * @property {() => Promise<void>} handleDeleteUserInfo deleteUserInfo service함수를 실행
 * @property {(httpStatus: number) => void} handleExiredToken httpStatus가 401,403이면 유저정보 삭제 후 로그인페이지로 이동
 */

/**
 * 전역적으로 사용하는 유저정보를 관리하기 위한 custom hooks
 * @param {useUserInfoParams} useUserInfoParams useUserInfo가 동작하기 위해 외부에서 주입해야하는 params
 * @returns {useUserInfoReturns} useUserInfo를 사용하는 곳에서 사용할 method 및 state
 */
const useUserInfo = () => {
  const notifyDispatch = useToastNotificationAction();
  const navigate = useNavigate();

  /**
   * 유저정보를 새롭게 요청하고 updateUserInfo service함수 실행
   * @returns {Promise<void>}
   */
  const handleUpdateUserInfo = async () => {
    try {
      const response = await userApi.GET_ESSENTIAL_INFO();
      const {
        data: { id, image, name },
      } = response;
      updateUserInfo({
        id,
        image,
        name,
      });
      navigate('/');
    } catch (apiError) {
      console.error(apiError);
      notifyNewMessage(
        notifyDispatch,
        `유저정보를 가져오지 못했습니다. \n다시 로그인해주세요.`,
        TOAST_TYPE.Error,
      );
      navigate(ROUTE.LOGIN);
    }
  };

  /**
   * deleteUserInfo service함수를 실행
   * @returns {Promise<void>}
   */
  const handleDeleteUserInfo = () => {
    deleteUserInfo();
    notifyNewMessage(notifyDispatch, '로그아웃 되었습니다', TOAST_TYPE.Info);
    setTimeout(() => {
      navigate(ROUTE.HOME);
      window.location.reload();
    }, 1000);
  };

  /**
   * httpStatus가 401,403이면 유저정보 삭제 후 로그인페이지로 이동
   * @param {number} httpStatus
   * @returns {Promise<void>}
   */
  const handleExiredToken = (httpStatus) => {
    if (httpStatus !== 403 && httpStatus !== 401) {
      return;
    }
    deleteUserInfo();
    notifyNewMessage(
      notifyDispatch,
      '토큰이 만료되었습니다. \n다시 로그인해주세요.',
      TOAST_TYPE.Info,
    );
    setTimeout(() => {
      navigate(ROUTE.LOGIN);
    }, 2000);
  };

  return { handleUpdateUserInfo, handleDeleteUserInfo, handleExiredToken };
};

export default useUserInfo;
