import React from 'react';
import PropTypes from 'prop-types';
import * as S from './TechStackSelectInput.style';

TechStackSelectedViewer.propTypes = {
  isError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isDropdownOpen: PropTypes.bool.isRequired,
  isValues: PropTypes.bool.isRequired,
  parent: PropTypes.object.isRequired,
  selectedTechSkills: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleClickTargetDelete: PropTypes.func.isRequired,
  handleClickReset: PropTypes.func.isRequired,
  closeDropdown: PropTypes.func.isRequired,
};

export default function TechStackSelectedViewer({
  isError,
  isLoading,
  parent,
  isDropdownOpen,
  isValues,
  selectedTechSkills,
  handleClickTargetDelete,
  placeholder,
  handleClickReset,
  closeDropdown,
}) {
  const AngleButton = isDropdownOpen ? S.UpAngle : S.DownAngle;

  const ClearButton = selectedTechSkills && (
    <S.ClearableButton onClick={handleClickReset}>
      <S.CloseNormal />
    </S.ClearableButton>
  );

  const showLoaderWithClearButton = isLoading ? <div>....</div> : ClearButton;

  return (
    <S.ValueViewer isError={isError} ref={parent} isDropdownOpen={isDropdownOpen}>
      {isValues ? (
        <S.SelectedStacks>
          {selectedTechSkills.map(({ id, label, value }) => (
            <S.SingleStack key={id}>
              <span>{label}</span>
              <S.CloseNormal onClick={() => handleClickTargetDelete({ targetId: id })} />
            </S.SingleStack>
          ))}
        </S.SelectedStacks>
      ) : (
        <S.PlaceHolder>{placeholder}</S.PlaceHolder>
      )}
      <S.ButtonContainer>
        {showLoaderWithClearButton}
        <S.ButtonDivider isRow={false} />
        <AngleButton onClick={closeDropdown} />
      </S.ButtonContainer>
    </S.ValueViewer>
  );
}
