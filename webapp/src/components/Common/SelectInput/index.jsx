import React from 'react';
import PropTypes from 'prop-types';
import useDropdown from 'hooks/useDropdown';
import * as S from './SelectInput.style';
import SinglePlaceHolder from './SinglePlaceHolder';
import MultiPlaceHolder from './MultiPlaceHolder';

// isMulti = true일 때는 value가 배열입니다.
SelectInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
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
    const targetValue = event.target.getAttribute('value');
    isMulti ? multiHandleClickOption(targetValue) : singleHandleClickOption(targetValue);
  };

  const singleHandleClickOption = (targetValue) => {
    onChange({ name, value: targetValue });
  };

  const multiHandleClickOption = (targetValue) => {
    onChange({ name, value: targetValue });
  };

  const handleClickReset = () => {
    onChange({ name, value: '' });
  };

  return (
    <S.Container customStyle={customStyle} onClick={openDropdown} {...rest}>
      <S.PlaceHolder isError={isError} ref={parent} isDropdownOpen={isDropdownOpen}>
        {isMulti ? (
          <MultiPlaceHolder
            values={value}
            label={label}
            isDropdownOpen={isDropdownOpen}
            handleClickReset={handleClickReset}
            closeDropdown={closeDropdown}
          />
        ) : (
          <SinglePlaceHolder
            value={value}
            label={label}
            isDropdownOpen={isDropdownOpen}
            handleClickReset={handleClickReset}
            closeDropdown={closeDropdown}
          />
        )}
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
