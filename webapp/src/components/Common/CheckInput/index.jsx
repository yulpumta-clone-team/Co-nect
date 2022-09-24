import React from 'react';
import PropTypes from 'prop-types';

import * as S from './CheckInput.style';

CheckInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  customStyle: PropTypes.array,
  width: PropTypes.string,
  height: PropTypes.string,
};

// TODO: 팀 소속 여부 스타일 선택할 수 있게 추가하기
export default function CheckInput({ label, name, value, onChange, customStyle, width, height }) {
  const handleClickCheck = () => {
    onChange({ name, value: !value });
  };
  const InputBox = value ? S.CheckRectangeSvg : S.RectangeSvg;
  return (
    <S.Container customStyle={customStyle}>
      <InputBox onChange={handleClickCheck} />
      <span>{label}</span>
    </S.Container>
  );
}
