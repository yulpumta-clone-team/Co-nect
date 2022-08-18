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
  defaultOption: PropTypes.object.isRequired,
  customStyle: PropTypes.array,
};

export default function SelectInput({ options, label, defaultOption, customStyle, ...rest }) {
  const { parent, handleClickOutside, isDropdownOpen, openDropdown, closeDropdown } = useDropdown();
  const AngleButton = isDropdownOpen ? S.UpAngle : S.DownAngle;
  const handleClick = () => {
    closeDropdown();
  };
  return (
    <S.Container customStyle={customStyle} ref={parent} onClick={openDropdown}>
      <S.PlaceHolder>
        <h3>{label}</h3>
        <AngleButton onClick={closeDropdown} />
      </S.PlaceHolder>
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
