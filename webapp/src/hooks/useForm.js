import { useState } from 'react';

const useForm = ({ initialValues, submitCallback, validate }) => {
  const [inputValues, setInputValues] = useState(initialValues);
  const [apiError, setApiError] = useState({});
  const [validateError, setValidateError] = useState(validate(initialValues));
  const [isLoading, setIsLoading] = useState(false);

  // validateError 객체에 있는 모든 데이터의 value가 ""이거나 null이면 true를 반환

  const satisfyAllValidites = Object.values(validateError).every((value) => !value);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
    setValidateError(validate({ ...inputValues, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!satisfyAllValidites) {
      // TODO: api Error = true 설정
      return;
    }
    setIsLoading(true);
    await submitCallback(inputValues);
    setIsLoading(false);
  };

  return {
    inputValues,
    validateError,
    isLoading,
    onChangeHandler,
    submitHandler,
    satisfyAllValidites,
  };
};

export default useForm;
