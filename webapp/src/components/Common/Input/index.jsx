import React from 'react';
import PropTypes from 'prop-types';

import * as S from './style';

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string,
  isError: PropTypes.bool,
  helperText: PropTypes.string,
  customStyle: PropTypes.array,
};

export default function Input({
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
    <S.Container isError={isError} customStyle={customStyle}>
      <S.Label>{label}</S.Label>
      <S.InputContainer isError={isError}>
        <S.Input
          label={label}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          {...rest}
        />
      </S.InputContainer>
      {isError && <S.Error>{helperText}</S.Error>}
    </S.Container>
  );
}