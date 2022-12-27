import React from 'react';
import PropTypes from 'prop-types';
import CheckMarkSvg from 'assets/icons/CheckMarkSvg';
import XMarkSvg from 'assets/icons/XMarkSvg';
import * as S from './TeamBelongCheckInput.style';

TeamBelongCheckInput.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  buttonSize: PropTypes.string,
  onlyDisplay: PropTypes.bool,
};

export default function TeamBelongCheckInput({
  value,
  onChange,
  label,
  name,
  buttonSize = '39px',
  onlyDisplay = false,
}) {
  const handleClickOption = () => {
    !onlyDisplay && onChange({ name, value: !value });
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
            onlyDisplay={onlyDisplay}
          >
            <S.CheckCircle buttonSize={buttonSize}>
              <CheckMarkSvg />
            </S.CheckCircle>
          </S.CheckButton>
          <span>소속 됨</span>
        </S.CheckBox>
        <S.CheckBox>
          <S.CheckButton
            type="button"
            isActive={!value}
            onClick={handleClickOption}
            buttonSize={buttonSize}
            onlyDisplay={onlyDisplay}
          >
            <S.CloseCircle buttonSize={buttonSize}>
              <XMarkSvg />
            </S.CloseCircle>
          </S.CheckButton>
          <span>소속 안 됨</span>
        </S.CheckBox>
      </S.CheckBoxContainer>
    </S.Container>
  );
}
