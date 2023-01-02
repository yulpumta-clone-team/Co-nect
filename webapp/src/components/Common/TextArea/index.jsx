import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as S from './TextArea.style';

TextArea.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  isError: PropTypes.bool,
  helperText: PropTypes.string,
  customStyle: PropTypes.array,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default function TextArea({
  label,
  name,
  value,
  onChange,
  placeholder,
  isError = false,
  helperText,
  customStyle,
  width,
  height,
  ...rest
}) {
  const textAreaRef = useRef(null);
  // FIXME: 기본높이가 78px로 되어지는 버그 수정하기. => 커스텀스타일이 적용가능하게수정하기
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
        name={name}
        id={label}
        value={value}
        onChange={onChange}
        width={width}
        height={height}
      />
    </S.Container>
  );
}
