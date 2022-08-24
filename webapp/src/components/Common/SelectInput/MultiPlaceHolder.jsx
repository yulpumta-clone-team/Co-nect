import React from 'react';
import PropTypes from 'prop-types';
import * as S from './SelectInput.style';

MultiPlaceHolder.propTypes = {
  values: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  isDropdownOpen: PropTypes.bool.isRequired,
  handleClickReset: PropTypes.func.isRequired,
  closeDropdown: PropTypes.func.isRequired,
};

export default function MultiPlaceHolder({
  values,
  label,
  isDropdownOpen,
  handleClickReset,
  closeDropdown,
}) {
  const AngleButton = isDropdownOpen ? S.UpAngle : S.DownAngle;

  const isValues = values.length !== 0;

  return (
    <>
      {isValues ? (
        <S.DisplayValue>
          <span>{values.join(', ')}</span>
        </S.DisplayValue>
      ) : (
        <S.Label>{label}</S.Label>
      )}
      <S.ButtonContainer>
        {isValues && (
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
