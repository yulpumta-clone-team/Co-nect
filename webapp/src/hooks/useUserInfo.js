import userApi from 'api/user.api';
import { ROUTE } from 'constant/route.constant';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import { useNavigate } from 'react-router-dom';
import { updateUserInfoInLocalstorage, deleteUserInfoInLocalStorage } from 'service/auth';

const useUserInfo = ({ notifyNewMessage, notifyDispatch }) => {
  const navigate = useNavigate();
  const updateUserInfo = async () => {
    try {
      const response = await userApi.GET_ESSENTIAL_INFO();
      const {
        data: { id, image, name },
      } = response;
      updateUserInfoInLocalstorage({
        id,
        image,
        name,
      });
      navigate('/');
    } catch (apiError) {
      console.error(apiError);
      notifyNewMessage(notifyDispatch, apiError, TOAST_TYPE.Error);
      navigate(ROUTE.ESSENTIAL_INFO.INDEX);
    }
  };
  const deleteUserInfo = () => {
    deleteUserInfoInLocalStorage();
    navigate('/');
    notifyNewMessage(notifyDispatch, '로그아웃 되었습니다', TOAST_TYPE.Info);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  return { updateUserInfo, deleteUserInfo };
};

export default useUserInfo;
