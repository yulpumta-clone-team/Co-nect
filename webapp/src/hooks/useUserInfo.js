import userApi from 'api/user.api';
import { ROUTE } from 'constant/route.constant';
import { useToastNotificationAction } from 'contexts/ToastNotification';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import { useNavigate } from 'react-router-dom';
import { updateUserInfo, deleteUserInfo } from 'service/auth';

const useUserInfo = () => {
  const notifyDispatch = useToastNotificationAction();
  const navigate = useNavigate();
  const updateUserInfo = async () => {
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
  const deleteUserInfo = () => {
    deleteUserInfo();
    navigate('/');
    notifyNewMessage(notifyDispatch, '로그아웃 되었습니다', TOAST_TYPE.Info);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleExiredToken = (httpStatus) => {
    if (httpStatus !== 403 && httpStatus !== 401) {
      return;
    }
    deleteUserInfo();
    navigate('/');
    notifyNewMessage(
      notifyDispatch,
      '토큰이 만료되었습니다. \n다시 로그인해주세요.',
      TOAST_TYPE.Info,
    );
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return { updateUserInfo, deleteUserInfo, handleExiredToken };
};

export default useUserInfo;
