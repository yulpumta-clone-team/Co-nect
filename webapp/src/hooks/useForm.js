import { useToastNotificationAction } from 'contexts/ToastNotification';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import { useCallback, useState } from 'react';

/**
 * form에서 사용할 Input들의 객체에 대한 validation을 체크하는 함수
 * @callback ValidateChecker  Callback for useForm validate
 * @param {Object} inputsObj  form에서 사용할 input들의 객체의 키 값들
 * @returns {Object} errorObj  Input들의 에러 객체들
 */

/**
 * useform이 동작하기 위해 외부에서 주입해야하는 params
 * @typedef {Object} userFormParams
 * @property {Object} initialValues  form에서 사용할 input들의 객체
 * @property {function} submitCallback  form에서 사용할 submit 함수
 * @property {ValidateChecker} validate  form에서 사용할 Input들의 객체에 대한 validation을 체크하는 함수
 */

/**
 * useForm을 사용하는 곳에서 사용할 method 및 값들
 * @typedef {Object} userFormReturns
 * @property {Object} inputValues  form에서 사용하는 input들의 객체
 * @property {Object} validateError   form에서 사용하는 input에 해당하는 에러 객체
 * @property {function} onChangeHandler  inputValues 중 모든 text Input OnChange를 위한 함수
 * @property {function} onChangeHandlerWithSelect  inputValues 중 모든 select 태그 OnChange를 위한 함수
 * @property {function} submitHandler  모든 validate 조건을 만족하면 submitcallback 실행
 * @property {function} isTargetSatisfyValidate  validation을 체크하고 싶은 input의 키 값을 넣으면 boolean을 반환
 * @property {boolean} satisfyAllValidates  validateError 객체에 있는 모든 데이터의 value가 ""이거나 null이면 true를 반환
 */

/**
 * custom useForm hooks
 * @param {userFormParams} useFormParams useform이 동작하기 위해 외부에서 주입해야하는 params
 * @returns {userFormReturns} useForm을 사용하는 곳에서 사용할 method 및 값들
 */
const useForm = ({ initialValues, submitCallback, validate }) => {
  const [inputValues, setInputValues] = useState(initialValues);
  const [validateError, setValidateError] = useState(validate(initialValues));
  const notifyDispatch = useToastNotificationAction();

  /**
   * validateError 객체에 있는 모든 데이터의 value가 ""이거나 null이면 true를 반환
   * @type {boolean}
   */
  const satisfyAllValidates = Object.values(validateError).every((value) => !value);

  /**
   * validation을 체크하고 싶은 input의 키 값을 넣으면 boolean을 반환
   * @param {string} target validation을 체크하고 싶은 input의 키 값
   * @returns {boolean}
   */
  const isTargetSatisfyValidate = (target) => !!validateError[target];

  /**
   * inputValues 중 모든 text Input OnChange를 위한 함수
   * @param {event}
   * @return {void}
   */
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
    setValidateError(validate({ ...inputValues, [name]: value }));
  };

  /**
   * inputValues 중 모든 select 태그 OnChange를 위한 함수
   * @param {event}
   * @return {void}
   */
  const onChangeHandlerWithSelect = ({ name, value }) => {
    setInputValues({ ...inputValues, [name]: value });
    setValidateError(validate({ ...inputValues, [name]: value }));
  };

  /**
   * 모든 validate 조건을 만족하면 submitcallback 실행
   * @param {event}
   * @return {void}
   */
  const submitHandler = useCallback(
    async (event) => {
      event && event.preventDefault();

      if (!satisfyAllValidates) {
        Object.values(validateError)
          .filter((error) => error)
          .forEach((error) => {
            notifyNewMessage(notifyDispatch, error, TOAST_TYPE.Error);
          });

        return;
      }
      await submitCallback(inputValues);
    },
    [inputValues, notifyDispatch, satisfyAllValidates, submitCallback, validateError],
  );
  return {
    inputValues,
    validateError,
    onChangeHandler,
    onChangeHandlerWithSelect,
    submitHandler,
    satisfyAllValidates,
    isTargetSatisfyValidate,
  };
};

export default useForm;
