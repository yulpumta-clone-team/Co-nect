import React from 'react';
import PropTypes from 'prop-types';
import useDropdown from 'hooks/useDropdown';
import * as S from './SelectInput.style';
import SinglePlaceHolder from './SinglePlaceHolder';

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
  isMulti: PropTypes.bool,
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
  isMulti = false,
  isError = false,
  helperText,
  customStyle,
  ...rest
}) {
  const { parent, isDropdownOpen, openDropdown, closeDropdown } = useDropdown();
  const handleClickOption = (event) => {
    onChange({ name, value: event.target.getAttribute('value') });
    closeDropdown();
  };

  const handleClickReset = () => {
    onChange({ name, value: '' });
  };

  return (
    <S.Container customStyle={customStyle} onClick={openDropdown} {...rest}>
      <SinglePlaceHolder
        isError={isError}
        parent={parent}
        isDropdownOpen={isDropdownOpen}
        value={value}
        label={label}
        handleClickReset={handleClickReset}
        closeDropdown={closeDropdown}
      />
      {isError && <S.Error>{helperText}</S.Error>}
      <S.Select isDropdownOpen={isDropdownOpen}>
        {options.map(({ id, value, label }) => (
          <S.Option key={id} value={value} onClick={handleClickOption}>
            {label}
          </S.Option>
        ))}
      </S.Select>
    </S.Container>
  );
}
