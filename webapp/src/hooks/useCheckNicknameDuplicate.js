const { default: authApi } = require('api/auth.api');
const { useToastNotificationAction } = require('contexts/ToastNotification');
const { notifyNewMessage } = require('contexts/ToastNotification/action');
const { TOAST_TYPE } = require('contexts/ToastNotification/type');
const { useState } = require('react');

/**
 * useCheckNicknameDuplicate을 사용하는 곳에서 사용할 method 및 state
 * @typedef {Object} useCheckNicknameDuplicateReturns
 * @property {boolean} isNicknameDuplicate db에 중복되는 닉네임이 있는지 없는지
 * @property {boolean} isNickNameSameWithOrigin 초기값과 새로 입력 받은 값이 같은지 다른지
 * @property {(event) => void} onChangeCheckNicknameDuplicate 새로 입력 받는 닉네임의 change핸들러
 * @property {() => Promise<void>} onClickCheckDuplicateNickname 입력받은 값이 중복되는지 확인 요청보내는 함수
 */

/**
 * 닉네임 중복 여부를 체크하는 custom hooks
 * @param {string} initValue 검사할 닉네임의 초기값
 * @returns {useCheckNicknameDuplicateReturns} useCheckNicknameDuplicate을 사용하는 곳에서 사용할 method 및 state
 */
const useCheckNicknameDuplicate = (initValue) => {
  const [nickname, setNickname] = useState(initValue);
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(!!initValue); // 초기 값이 있으면 중복이 아니라는 뜻
  const notifyDispatch = useToastNotificationAction();

  /**
   * 초기값과 새로 입력 받은 값이 같은지 다른지
   */
  const isNickNameSameWithOrigin = nickname === initValue;

  /**
   * 새로 입력 받는 닉네임의 change핸들러
   * @param {Event} event
   */
  const onChangeCheckNicknameDuplicate = (event) => {
    const updateNickname = event.target.value;
    setNickname(updateNickname);
    setIsNicknameDuplicate(true);
  };

  /**
   * 입력받은 값이 중복되는지 확인 요청보내는 함수
   * @returns {Promise}
   */
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
