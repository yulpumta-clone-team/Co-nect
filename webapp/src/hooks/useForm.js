import { useToastNotificationAction } from 'contexts/ToastNotification';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import { useState } from 'react';

const useForm = ({ initialValues, submitCallback, validate }) => {
  const [inputValues, setInputValues] = useState(initialValues);
  const [validateError, setValidateError] = useState(validate(initialValues));
  const notifyDispatch = useToastNotificationAction();

  // validateError 객체에 있는 모든 데이터의 value가 ""이거나 null이면 true를 반환

  const satisfyAllValidates = Object.values(validateError).every((value) => !value);

  const isTargetSatisfyValidate = (target) => !!validateError[target];

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
    setValidateError(validate({ ...inputValues, [name]: value }));
  };

  const onChangeHandlerWithSelect = ({ name, value, isClear }) => {
    if (isClear) {
      setInputValues({ ...inputValues, [name]: initialValues[name] });
      setValidateError(validate({ ...inputValues, [name]: value }));
      return;
    }
    setInputValues({ ...inputValues, [name]: value });
    setValidateError(validate({ ...inputValues, [name]: value }));
  };

  const submitHandler = async (event) => {
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
  };

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
