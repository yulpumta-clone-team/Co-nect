import authApi from 'api/auth.api';
import userApi from 'api/user.api';
import { API_MESSAGE, TOKEN } from 'constant/api.constant';
import { ESSENTIAL_INFO_LINKS, ROUTE } from 'constant/route.constant';
import { useToastNotificationAction } from 'contexts/ToastNotification';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import { useNavigate } from 'react-router-dom';
import { deleteUserInfo, handleToken, updateUserInfo } from 'service/auth';
import useAxios from './useAxios';

/**
 * handleLogin이 동작하기 위해 외부에서 주입해야하는 params
 * @typedef {Object} saveJwtTokenParams
 * @property {string} accessToken
 * @property {string} refreshToken
 */

/**
 * useUserInfo를 사용하는 곳에서 사용할 method 및 state
 * @typedef {Object} useUserInfoReturns
 * @property {() => Promise<void>} handleUpdateUserInfo 유저정보를 새롭게 요청하고 updateUserInfo service함수 실행
 * @property {() => Promise<void>} handleDeleteUserInfo deleteUserInfo service함수를 실행
 * @property {() => Promise<void>} requestSignUp 회원가입 api 실행
 * @property {() => Promise<void>} requestLogin 로그인 api 실행
 * @property {() => Promise<void>} requestLogout 로그아웃 api 실행
 * @property {() => Promise<void>} saveJwtToken jwt토근을 프론트에 저장
 * @property {() => Promise<void>} checkIsFirstLogin 첫 로그인인지 확인하는 함수
 * @property {(httpStatus: number) => void} handleExiredToken httpStatus가 401,403이면 유저정보 삭제 후 로그인페이지로 이동
 */

/**
 * 전역적으로 사용하는 유저정보를 관리하기 위한 custom hooks
 * @param {useUserInfoParams} useUserInfoParams useUserInfo가 동작하기 위해 외부에서 주입해야하는 params
 * @returns {useUserInfoReturns} useUserInfo를 사용하는 곳에서 사용할 method 및 state
 */
const useAuthService = () => {
  const navigate = useNavigate();
  const notifyDispatch = useToastNotificationAction();
  const { notGetExecution: signUpExecution } = useAxios({
    axiosInstance: authApi.signUp,
    immediate: false,
  });
  const { notGetExecution: loginExecution } = useAxios({
    axiosInstance: authApi.login,
    immediate: false,
  });

  const { notGetExecution: updateUserProfileExecution } = useAxios({
    axiosInstance: userApi.POST_ESSENTIAL_INFO,
    immediate: false,
  });

  const handleShowEssesntialModal = (isFirstLogin) => {
    navigate(ESSENTIAL_INFO_LINKS.NICKNAME, { state: { isFirstLogin } });
  };

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
      setTimeout(() => {
        navigate(ROUTE.HOME);
      }, 1000);
    } catch (apiError) {
      console.error(apiError);
      notifyNewMessage(notifyDispatch, API_MESSAGE.ERROR_USER_INFO, TOAST_TYPE.Error);
      setTimeout(() => navigate(ROUTE.LOGIN), 2000);
    }
  };

  /**
   * deleteUserInfo service함수를 실행
   * @returns {Promise<void>}
   */
  const handleDeleteUserInfo = () => {
    deleteUserInfo();
    notifyNewMessage(notifyDispatch, API_MESSAGE.LOGOUT, TOAST_TYPE.Info);
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
    notifyNewMessage(notifyDispatch, API_MESSAGE.EXPIRE_TOKEN, TOAST_TYPE.Info);
    setTimeout(() => {
      navigate(ROUTE.LOGIN);
    }, 2000);
  };

  const requestSignUp = async (submitData) => {
    const response = await signUpExecution({
      newConfig: { submitData },
      successMessage: API_MESSAGE.SIGNUP,
    });
    setTimeout(() => {
      response && navigate(ROUTE.LOGIN);
    }, 1000);
  };

  const requestLogin = async (submitData) => {
    const response = await loginExecution({
      newConfig: { submitData },
      successMessage: API_MESSAGE.LOGIN,
    });
    if (!response) return;
    const {
      headers,
      data: { isFirst: isFirstLogin },
    } = response;
    saveJwtToken({ accessToken: headers[TOKEN.ACCESS], refreshToken: headers[TOKEN.REFRESH] });
    checkIsFirstLogin(isFirstLogin);
  };

  /**
   * access token과 refresh token을 저장g하는 함수
   * @param {Object} saveJwtTokenParams
   */
  const saveJwtToken = ({ accessToken, refreshToken }) => {
    handleToken.saveAccessToken(accessToken);
    handleToken.saveRefreshToken(refreshToken);
  };

  /**
   * 최초로그인인지여부를 판단해서 다음 동작을 실행하는 함수
   * @param {boolean} isFirstLogin
   */
  const checkIsFirstLogin = (isFirstLogin) => {
    setTimeout(() => {
      if (isFirstLogin) {
        handleShowEssesntialModal(isFirstLogin);
      } else {
        handleUpdateUserInfo();
      }
    }, 1000);
  };

  /**
   * deleteUserInfo service함수를 실행
   * @returns {Promise<void>}
   */
  const requestLogout = () => {
    deleteUserInfo();
    notifyNewMessage(notifyDispatch, API_MESSAGE.LOGOUT, TOAST_TYPE.Info);
    setTimeout(() => {
      navigate(ROUTE.HOME);
      window.location.reload();
    }, 1000);
  };

  const requestUpdateUserProfile = async (submitData) => {
    await updateUserProfileExecution({
      newConfig: { data: submitData },
      successMessage: API_MESSAGE.SUCCESS_SAVE_USER_INFO,
    });
    handleUpdateUserInfo();
  };

  return {
    requestSignUp,
    requestLogin,
    requestLogout,
    requestUpdateUserProfile,
    handleUpdateUserInfo,
    handleDeleteUserInfo,
    handleExiredToken,
    saveJwtToken,
    checkIsFirstLogin,
  };
};

export default useAuthService;
