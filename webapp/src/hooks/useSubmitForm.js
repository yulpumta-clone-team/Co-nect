import React, { useEffect, useState } from 'react';
import validate from './validate';
import './styles.css';

const useSubmitForm = ({ initialValues, onSubmit, validate }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event) => {
    setSubmitting(true);
    event.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
    setErrors(validate(values));
  };

  useEffect(() => {
    if (submitting) {
      if (Object.keys(errors).length === 0) {
        onSubmit(values);
      }
      setSubmitting(false);
    }
  }, [errors]);

  return {
    values,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  };
};

export default useSubmitForm;
