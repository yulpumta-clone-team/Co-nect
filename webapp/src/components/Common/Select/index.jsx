import React from 'react';
import PropTypes from 'prop-types';

Select.propTypes = {
  register: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
};

export default function Select({ register, options, name, ...rest }) {
  return (
    <select {...register(name)} {...rest}>
      {options.map((value) => (
        <option value={value}>{value}</option>
      ))}
    </select>
  );
}
