import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useDropdown from 'hooks/useDropdown';
import * as S from './SelectInput.style';

SelectInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isError: PropTypes.bool,
  helperText: PropTypes.string,
  defaultOption: PropTypes.object.isRequired,
  customStyle: PropTypes.array,
};

export default function SelectInput({
  value,
  onChange,
  options,
  label,
  name,
  defaultOption,
  isError = false,
  helperText,
  customStyle,
  ...rest
}) {
  const { parent, handleClickOutside, isDropdownOpen, openDropdown, closeDropdown } = useDropdown();
  const AngleButton = isDropdownOpen ? S.UpAngle : S.DownAngle;
  const [displayValue, setDisplayValue] = useState(value);
  const handleClick = (event) => {
    setDisplayValue(event.target.getAttribute('value'));
    onChange({ name, value: event.target.getAttribute('value') });
    closeDropdown();
  };

  return (
    <S.Container customStyle={customStyle} ref={parent} onClick={openDropdown}>
      <S.PlaceHolder isError={isError}>
        {value ? <S.DisplayValue>{value}</S.DisplayValue> : <S.Label>{label}</S.Label>}
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
