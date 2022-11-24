import { ESSENTIAL_INFO_LINKS } from 'constant/route.constant';
import { useToastNotificationAction } from 'contexts/ToastNotification';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import { useNavigate } from 'react-router-dom';
import { handleToken } from 'service/auth';
import useUserInfo from './useUserInfo';

const useHandleLogin = () => {
  const navigate = useNavigate();
  const notifyDispatch = useToastNotificationAction();
  const { handleUpdateUserInfo } = useUserInfo();

  const handleShowEssesntialModal = (isFirstLogin) => {
    navigate(ESSENTIAL_INFO_LINKS.NICKNAME, { state: { isFirstLogin } });
  };

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
