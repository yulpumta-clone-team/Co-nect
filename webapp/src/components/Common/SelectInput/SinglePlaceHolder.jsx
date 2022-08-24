import React from 'react';
import PropTypes from 'prop-types';
import * as S from './SelectInput.style';

SinglePlaceHolder.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isDropdownOpen: PropTypes.bool.isRequired,
  handleClickReset: PropTypes.func.isRequired,
  closeDropdown: PropTypes.func.isRequired,
};

export default function SinglePlaceHolder({
  value,
  label,
  isDropdownOpen,
  handleClickReset,
  closeDropdown,
}) {
  const AngleButton = isDropdownOpen ? S.UpAngle : S.DownAngle;
  return (
    <>
      {value ? (
        <S.DisplayValue>
          <span>{value}</span>
        </S.DisplayValue>
      ) : (
        <S.Label>{label}</S.Label>
      )}
      <S.ButtonContainer>
        {value && (
          <>
            <S.ClearableButton onClick={handleClickReset}>
              <S.CloseNormal />
            </S.ClearableButton>
            <S.ButtonDivider isRow={false} />
          </>
        )}
        <AngleButton onClick={closeDropdown} />
      </S.ButtonContainer>
    </>
  );
}
