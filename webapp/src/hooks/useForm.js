import { useState } from 'react';

const useForm = ({ initialValues, submitCallback, validate }) => {
  const [inputValues, setInputValues] = useState(initialValues);
  const [validateError, setValidateError] = useState(validate(initialValues));

  // validateError 객체에 있는 모든 데이터의 value가 ""이거나 null이면 true를 반환

  const satisfyAllValidates = Object.values(validateError).every((value) => !value);

  // const satisftyTargetValidate =

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
    setValidateError(validate({ ...inputValues, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!satisfyAllValidates) {
      return;
    }
    await submitCallback(inputValues);
  };

  return {
    inputValues,
    validateError,
    onChangeHandler,
    submitHandler,
    satisfyAllValidates,
  };
};

export default useForm;
