import React from 'react';
import PropTypes from 'prop-types';
import useDropdown from 'hooks/useDropdown';
import * as S from './SelectInput.style';
import Divider from '../Divider';

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
  const { parent, isDropdownOpen, openDropdown, closeDropdown } = useDropdown();
  const AngleButton = isDropdownOpen ? S.UpAngle : S.DownAngle;
  const handleClickOption = (event) => {
    onChange({ name, value: event.target.getAttribute('value') });
    closeDropdown();
  };

  const handleClickReset = () => {
    onChange({ name, value: '' });
  };

  return (
    <S.Container customStyle={customStyle} onClick={openDropdown} {...rest}>
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
