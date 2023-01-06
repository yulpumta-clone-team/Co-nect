import { useToastNotificationAction } from 'contexts/ToastNotification';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import { useCallback, useState } from 'react';

const FORM_MODE = {
  onChange: 'onChange',
  onSubmit: 'onSubmit',
};

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
 * @property {(inputValues: Object) => Promise<void>} submitCallback  form에서 사용할 submit 함수
 * @property {ValidateChecker} validate  form에서 사용할 Input들의 객체에 대한 validation을 체크하는 함수
 * @property {string} mode 체크를 언제할지 정하는 mode (onChange, onSubmit)
 */

/**
 * useForm을 사용하는 곳에서 사용할 method 및 state
 * @typedef {Object} userFormReturns
 * @property {Object} inputValues  form에서 사용하는 input들의 객체
 * @property {Object} validateError   form에서 사용하는 input에 해당하는 에러 객체
 * @property {(Event) => void} onChangeHandler  inputValues 중 모든 text Input OnChange를 위한 함수
 * @property {(Event) => void} onChangeHandlerWithSelect  inputValues 중 모든 select 태그 OnChange를 위한 함수
 * @property {(Event) => Promise<void>} submitHandler  모든 validate 조건을 만족하면 submitcallback 실행
 * @property {(target: string) => boolean} isTargetSatisfyValidate  validation을 체크하고 싶은 input의 키 값을 넣으면 boolean을 반환
 * @property {boolean} satisfyAllValidates  validateError 객체에 있는 모든 데이터의 value가 ""이거나 null이면 true를 반환
 */

/**
 * custom useForm hooks
 * @param {userFormParams} useFormParams useform이 동작하기 위해 외부에서 주입해야하는 params
 * @returns {userFormReturns} useForm을 사용하는 곳에서 사용할 method 및 값들
 */
const useForm = ({ initialValues, submitCallback, validate, mode = FORM_MODE.onChange }) => {
  const [inputValues, setInputValues] = useState(initialValues);
  const [validateError, setValidateError] = useState({});
  const notifyDispatch = useToastNotificationAction();

  const resetInputValues = () => {
    setInputValues(initialValues);
  };

  const resetValidateErrors = () => {
    setValidateError({});
  };

  /**
   * inputValues를 동시에 검사해서 모든 input에 에러가 없으면 true변환
   * @type {boolean}
   */
  const satisfyAllValidates = Object.values(validate(inputValues)).every((value) => !value);

  /**
   * validation을 체크하고 싶은 input의 키 값을 넣으면 boolean을 반환
   * @param {string} target validation을 체크하고 싶은 input의 키 값
   * @returns {boolean} 에러 메시지가 없으면 false 있으면 true
   */
  const isTargetSatisfyValidate = (target) => !!validateError[target];

  /**
   * 에러를 표시할 방법에 따라 에러객체를 반환하는 함수
   * @param {*} name input태그의 key값
   * @param {*} value  input태그의 값
   */
  const onChangeError = (name, value) => {
    if (mode === FORM_MODE.onChange) {
      const res = validate({ ...inputValues, [name]: value });
      setValidateError({ ...validateError, [name]: res[name] });
    } else {
      setValidateError(validate({ ...inputValues, [name]: value }));
    }
  };

  /**
   * inputValues 중 모든 text Input OnChange를 위한 함수
   * @param {event}
   * @return {void}
   */
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
    onChangeError(name, value);
    // const res = validate({ [name]: value });
    // setValidateError({ ...validateError, [name]: res[name] });
  };

  /**
   * inputValues 중 모든 select 태그 OnChange를 위한 함수
   * @param {event}
   * @return {void}
   */
  const onChangeHandlerWithSelect = ({ name, value }) => {
    setInputValues({ ...inputValues, [name]: value });
    onChangeError(name, value);
    // setValidateError(validate({ ...validateError, [name]: value }));
  };

  const showEntireError = () => {
    setValidateError(validate({ ...inputValues }));
    Object.values(validateError)
      .filter((error) => error)
      .forEach((error) => {
        notifyNewMessage(notifyDispatch, error, TOAST_TYPE.Error);
      });
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
        showEntireError();
        return;
      }
      await submitCallback(inputValues);
      resetInputValues();
      resetValidateErrors();
    },
    [inputValues, resetInputValues, resetValidateErrors, satisfyAllValidates, submitCallback],
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
