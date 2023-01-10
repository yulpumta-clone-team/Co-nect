import { useState } from 'react';
import authApi from 'api/auth.api';
import { useToastNotificationAction } from 'contexts/ToastNotification';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';

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
const useCheckUserDuplicate = (initValue) => {
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(true);
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(true);
  const notifyDispatch = useToastNotificationAction();

  /**
   * 초기값과 새로 입력 받은 값이 같은지 다른지
   */
  const isNickNameSameWithOrigin = (newNickname) => newNickname === initValue;

  /**
   * 입력받은 닉네임이 중복되는지 확인 요청보내는 함수
   * @param {string} 새로 입력한 닉네임
   * @returns {Promise}
   */
  const onClickCheckDuplicateNickname = async (newNickname) => {
    let isOverStandard = true;
    setTimeout(() => {
      if (isOverStandard) notifyNewMessage(notifyDispatch, '처리 중입니다...', TOAST_TYPE.Info);
    }, 1500);
    // 원래 사용하던 닉네임과 같으면 확인하지 않음.
    if (newNickname === initValue) {
      notifyNewMessage(notifyDispatch, '원래 닉네임이어서 사용가능합니다!', TOAST_TYPE.Info);
      isOverStandard = false;
      return;
    }
    try {
      const response = await authApi.checkDuplicateNickName({ name: newNickname });
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
    } finally {
      isOverStandard = false;
    }
  };

  /**
   * 입력받은 이메일이 중복되는지 확인 요청보내는 함수
   * @param {stirng} email
   */
  const onClickCheckDuplicateEmail = async (email) => {
    let isOverStandard = true;
    setTimeout(() => {
      if (isOverStandard) notifyNewMessage(notifyDispatch, '처리 중입니다...', TOAST_TYPE.Info);
    }, 1500);
    try {
      const response = await authApi.checkDuplicateEmail({ email });
      const isDuplicated = response.data;
      if (isDuplicated) {
        notifyNewMessage(notifyDispatch, '이미 사용중인 이메일니다!', TOAST_TYPE.Warning);
        setIsEmailDuplicate(true);
      } else {
        notifyNewMessage(notifyDispatch, '사용가능한 이메일니다!', TOAST_TYPE.Success);
        setIsEmailDuplicate(false);
      }
    } catch (error) {
      console.error(error);
      notifyNewMessage(notifyDispatch, error.message, 'Error');
    } finally {
      isOverStandard = false;
    }
  };

  return {
    isNicknameDuplicate,
    isNickNameSameWithOrigin,
    onClickCheckDuplicateNickname,
    isEmailDuplicate,
    onClickCheckDuplicateEmail,
  };
};

export default useCheckUserDuplicate;
