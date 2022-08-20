import React, { useEffect, useRef } from 'react';
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
  const textAreaRef = useRef(null);
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '0px'; // 글자 줄일 때도 사이즈가 줄어들어야해서
      const { scrollHeight } = textAreaRef.current;
      textAreaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [textAreaRef, value]);
  return (
    <S.Container customStyle={customStyle}>
      <S.Label>{label}</S.Label>
      <S.TextArea
        ref={textAreaRef}
        placeholder={placeholder}
        name={label}
        id={label}
        value={value}
        onChange={onChange}
      />
    </S.Container>
  );
}
