import React from 'react';
import PropTypes from 'prop-types';
import * as S from './SelectInput.style';
import Divider from '../Divider';

SinglePlaceHolder.propTypes = {
  isError: PropTypes.bool.isRequired,
  parent: PropTypes.elementType.isRequired,
  isDropdownOpen: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleClickReset: PropTypes.func.isRequired,
  closeDropdown: PropTypes.func.isRequired,
};

export default function SinglePlaceHolder({
  isError,
  parent,
  isDropdownOpen,
  value,
  label,
  handleClickReset,
  closeDropdown,
}) {
  const AngleButton = isDropdownOpen ? S.UpAngle : S.DownAngle;
  return (
    <S.PlaceHolder isError={isError} ref={parent} isDropdownOpen={isDropdownOpen}>
      {value ? (
        <S.DisplayValue>
          <span>{value}</span>
        </S.DisplayValue>
      ) : (
        <S.Label>{label}</S.Label>
      )}
      <S.ButtonContainer>
        {value && (
          <S.ClearableButton onClick={handleClickReset}>
            <S.CloseNormal />
          </S.ClearableButton>
        )}
        <Divider isRow={false} />
        <AngleButton onClick={closeDropdown} />
      </S.ButtonContainer>
    </S.PlaceHolder>
  );
}
