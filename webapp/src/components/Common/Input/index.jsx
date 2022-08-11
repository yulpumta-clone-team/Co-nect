import React from 'react';
import PropTypes from 'prop-types';

Input.propTypes = {
  register: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

function Input({ register, name, ...rest }) {
  return <input {...register(name)} {...rest} />;
}
export default Input;
