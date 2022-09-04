const { default: authApi } = require('api/auth.api');
const { useToastNotificationAction } = require('contexts/ToastNotification');
const { notifyNewMessage } = require('contexts/ToastNotification/action');
const { TOAST_TYPE } = require('contexts/ToastNotification/type');
const { useState } = require('react');

const useCheckNicknameDuplicate = (initValue) => {
  const [nickname, setNickname] = useState(initValue);
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(!!initValue); // 초기 값이 있으면 중복이 아니라는 뜻
  const notifyDispatch = useToastNotificationAction();

  const isNickNameSameWithOrigin = nickname === initValue;

  const onChangeCheckNicknameDuplicate = (event) => {
    const updateNickname = event.target.value;
    setNickname(updateNickname);
    setIsNicknameDuplicate(true);
  };

  const onClickCheckDuplicateNickname = async () => {
    // TODO: 1초가 넘으면 처리중입니다 메세지 보여지게 수정
    notifyNewMessage(notifyDispatch, '처리 중입니다...', TOAST_TYPE.Info);
    // 원래 사용하던 닉네임과 같으면 확인하지 않음.
    if (nickname === initValue) {
      notifyNewMessage(notifyDispatch, '원래 닉네임이어서 사용가능합니다!', TOAST_TYPE.Info);
      return;
    }
    try {
      const response = await authApi.checkDuplicateNickName({ name: nickname });
      const isDuplicated = response.data;
      if (isDuplicated) {
        notifyNewMessage(notifyDispatch, '이미 사용중인 닉네임입니다!', TOAST_TYPE.Warning);
        setIsNicknameDuplicate(true);
      } else {
        notifyNewMessage(notifyDispatch, '사용가능한 닉네임입니다!', TOAST_TYPE.Success);
        setIsNicknameDuplicate(false);
      }
    } catch (error) {
      console.error(error);
      notifyNewMessage(notifyDispatch, error.message, TOAST_TYPE.Error);
      setIsNicknameDuplicate(true);
    }
  };

  return {
    isNicknameDuplicate,
    isNickNameSameWithOrigin,
    onChangeCheckNicknameDuplicate,
    onClickCheckDuplicateNickname,
  };
};

export default useCheckNicknameDuplicate;
