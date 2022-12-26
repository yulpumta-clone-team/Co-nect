import { ESSENTIAL_INFO_LINKS } from 'constant/route.constant';
import { useToastNotificationAction } from 'contexts/ToastNotification';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import { useNavigate } from 'react-router-dom';
import { handleToken } from 'service/auth';
import useUserInfo from './useUserInfo';

/**
 * handleLogin이 동작하기 위해 외부에서 주입해야하는 params
 * @typedef {Object} userFormParams
 * @property {string} accessToken
 * @property {string} refreshToken
 * @property {boolean} isFirstLogin 최초로그인인지 여부
 */

const useHandleLogin = () => {
  const navigate = useNavigate();
  const notifyDispatch = useToastNotificationAction();
  const { handleUpdateUserInfo } = useUserInfo();

  const handleShowEssesntialModal = (isFirstLogin) => {
    navigate(ESSENTIAL_INFO_LINKS.NICKNAME, { state: { isFirstLogin } });
  };

  // TODO: 토큰저장과 최초로그인 판단 여부를 분리하기
  /**
   * access token과 refresh token을 저장하고, 최초로그인인지 여부를 판단한하는 로그인 함수
   * @param {Object} userFormParams
   */
  const handleLogin = ({ accessToken, refreshToken, isFirstLogin }) => {
    handleToken.saveAccessToken(accessToken);
    handleToken.saveRefreshToken(refreshToken);

    notifyNewMessage(notifyDispatch, '로그인이 성공적으로 완료되었습니다.', TOAST_TYPE.Success);
    setTimeout(() => {
      if (isFirstLogin) {
        handleShowEssesntialModal(isFirstLogin);
      } else {
        handleUpdateUserInfo();
      }
    }, 1000);
  };
  return { handleLogin };
};

export default useHandleLogin;
