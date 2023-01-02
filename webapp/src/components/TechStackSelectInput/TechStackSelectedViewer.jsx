import React from 'react';
import PropTypes from 'prop-types';
import XMarkSvg from 'assets/icons/XMarkSvg';
import ChevronUpSvg from 'assets/icons/ChevronUpSvg';
import ChevronDownSvg from 'assets/icons/ChevronDownSvg';
import Spinner from 'components/Common/Loader/Spinner';
import * as S from './TechStackSelectInput.style';

TechStackSelectedViewer.propTypes = {
  isError: PropTypes.bool.isRequired,
  isDropdownOpen: PropTypes.bool.isRequired,
  isValues: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  helperText: PropTypes.string,
  parent: PropTypes.object.isRequired,
  selectedTechSkills: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleClickTargetDelete: PropTypes.func.isRequired,
  handleClickReset: PropTypes.func.isRequired,
  closeDropdown: PropTypes.func.isRequired,
};

export default function TechStackSelectedViewer({
  isError,
  parent,
  isDropdownOpen,
  isValues,
  isLoading,
  helperText,
  selectedTechSkills,
  handleClickTargetDelete,
  placeholder,
  handleClickReset,
  closeDropdown,
}) {
  const AngleButton = isDropdownOpen ? ChevronUpSvg : ChevronDownSvg;
  const ClearButton = selectedTechSkills && (
    <S.ClearableButton type="button" onClick={handleClickReset}>
      <XMarkSvg />
    </S.ClearableButton>
  );

  const showLoaderWithClearButton = isLoading ? <div>...</div> : ClearButton;

  return (
    <S.ValueViewer isError={isError} ref={parent} isDropdownOpen={isDropdownOpen}>
      {isValues ? (
        <S.SelectedStacks>
          {selectedTechSkills.map(({ id, label, value, image }) => (
            <S.SingleStack key={id} onClick={() => handleClickTargetDelete({ targetId: id })}>
              <img src={image} alt={label} />
            </S.SingleStack>
          ))}
        </S.SelectedStacks>
      ) : (
        <S.PlaceHolder>{isError ? <S.Error>{helperText}</S.Error> : placeholder}</S.PlaceHolder>
      )}
      <S.ButtonContainer>
        {showLoaderWithClearButton}
        <S.ButtonDivider isRow={false} />
        <S.ChevronButton onClick={closeDropdown} type="button">
          <AngleButton />
        </S.ChevronButton>
      </S.ButtonContainer>
    </S.ValueViewer>
  );
}
