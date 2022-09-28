import React from 'react';
import PropTypes from 'prop-types';
import * as S from './TeamBelongCheckInput.style';

TeamBelongCheckInput.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  buttonSize: PropTypes.string,
};

export default function TeamBelongCheckInput({
  value,
  onChange,
  label,
  name,
  buttonSize = '39px',
}) {
  const handleClickOption = () => {
    onChange({ name, value: !value });
  };
  return (
    <S.Container>
      {label && <S.Label>{label}</S.Label>}
      <S.CheckBoxContainer>
        <S.CheckBox>
          <S.CheckButton
            type="button"
            isActive={value}
            onClick={handleClickOption}
            buttonSize={buttonSize}
          >
            <S.CheckNormalSvg buttonSize={buttonSize} />
          </S.CheckButton>
          <span>소속 됨</span>
        </S.CheckBox>
        <S.CheckBox>
          <S.CheckButton
            type="button"
            isActive={!value}
            onClick={handleClickOption}
            buttonSize={buttonSize}
          >
            <S.CloseNormalSvg buttonSize={buttonSize} />
          </S.CheckButton>
          <span>소속 안 됨</span>
        </S.CheckBox>
      </S.CheckBoxContainer>
    </S.Container>
  );
}
