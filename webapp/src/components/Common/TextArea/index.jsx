import React from 'react';
import PropTypes from 'prop-types';
import * as S from './TextArea.style';

TextArea.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string,
  isError: PropTypes.bool,
  helperText: PropTypes.string,
  customStyle: PropTypes.array,
};

export default function TextArea({
  label,
  value,
  onChange,
  placeholder,
  isError = false,
  helperText,
  customStyle,
  ...rest
}) {
  return (
    <S.Container customStyle={customStyle}>
      <S.Label>{label}</S.Label>
      <S.TextArea
        placeholder={placeholder}
        name={label}
        id={label}
        value={value}
        onChange={onChange}
      />
    </S.Container>
  );
}
