import React from 'react';
import PropTypes from 'prop-types';
import useDropdown from 'hooks/useDropdown';
import * as S from './SelectInput.style';

SelectInput.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  label: PropTypes.string.isRequired,
  isError: PropTypes.bool,
  helperText: PropTypes.string,
  defaultOption: PropTypes.object.isRequired,

  customStyle: PropTypes.array,
};

export default function SelectInput({
  options,
  label,
  defaultOption,
  isError = false,
  helperText,
  customStyle,
  ...rest
}) {
  const { parent, handleClickOutside, isDropdownOpen, openDropdown, closeDropdown } = useDropdown();
  const AngleButton = isDropdownOpen ? S.UpAngle : S.DownAngle;
  const handleClick = () => {
    closeDropdown();
  };
  return (
    <S.Container customStyle={customStyle} ref={parent} onClick={openDropdown}>
      <S.PlaceHolder isError={isError}>
        <S.Label>{label}</S.Label>
        <AngleButton onClick={closeDropdown} />
      </S.PlaceHolder>
      {isError && <S.Error>{helperText}</S.Error>}
      <S.Select isDropdownOpen={isDropdownOpen}>
        {options.map(({ id, value, label }) => (
          <S.Option key={id} value={value} onClick={handleClick}>
            {label}
          </S.Option>
        ))}
      </S.Select>
    </S.Container>
  );
}
