import React from 'react';
import PropTypes from 'prop-types';
import useDropdown from 'hooks/useDropdown';
import XMarkSvg from 'assets/icons/XMarkSvg';
import ChevronUpSvg from 'assets/icons/ChevronUpSvg';
import ChevronDownSvg from 'assets/icons/ChevronDownSvg';
import SinglePlaceHolder from './PlaceHolder/SinglePlaceHolder';
import MultiPlaceHolder from './PlaceHolder/MultiPlaceHolder';
import * as S from './SelectInput.style';

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
  placeHolder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  image: PropTypes.string,
  isMulti: PropTypes.bool,
  isError: PropTypes.bool,
  helperText: PropTypes.string,
  defaultOption: PropTypes.object,
  customStyle: PropTypes.array,
  height: PropTypes.string,
  width: PropTypes.string,
};

export default function SelectInput({
  value,
  onChange,
  options,
  label,
  placeHolder,
  name,
  image,
  defaultOption,
  isMulti = false,
  isError = false,
  helperText,
  customStyle,
  height,
  width,
  ...rest
}) {
  const { parent, isDropdownOpen, openDropdown, closeDropdown, handleClickdropdownTrigger } =
    useDropdown();
  const AngleButton = isDropdownOpen ? ChevronUpSvg : ChevronDownSvg;
  const handleClickOption = (event) => {
    const targetValue = event.target.getAttribute('value');
    isMulti ? multiClickOption(targetValue) : singleClickOption(targetValue);
  };

  const singleClickOption = (targetValue) => {
    onChange({ name, value: targetValue });
  };

  const multiClickOption = (targetValue) => {
    const NonDuplicateValues = [...new Set([...value, targetValue])];
    onChange({ name, value: NonDuplicateValues });
  };

  const handleClickTargetDelete = ({ targetValue }) => {
    const filteredValues = value.filter((element) => targetValue !== element);
    onChange({ name, value: filteredValues });
  };

  const handleClickReset = () => {
    isMulti ? multiClickReset() : singleClickReset();
  };

  const singleClickReset = () => {
    onChange({ name, value: '' });
  };
  const multiClickReset = () => {
    onChange({ name, value: [] });
  };
  return (
    <S.Container
      width={width}
      height={height}
      customStyle={customStyle}
      onClick={openDropdown}
      {...rest}
    >
      {label && <S.Label>{label}</S.Label>}
      <S.ValueViewer isError={isError} ref={parent} isDropdownOpen={isDropdownOpen}>
        {isMulti ? (
          <MultiPlaceHolder
            values={value}
            placeHolder={placeHolder}
            handleClickTargetDelete={handleClickTargetDelete}
          />
        ) : (
          <SinglePlaceHolder value={value} placeHolder={placeHolder} />
        )}
        <S.ButtonContainer>
          {value && (
            <>
              <S.XMarkButton onClick={handleClickReset} type="button">
                <XMarkSvg />
              </S.XMarkButton>
              <S.ButtonDivider isRow={false} />
            </>
          )}
          <S.ChevronButton onClick={handleClickdropdownTrigger} type="button">
            <AngleButton />
          </S.ChevronButton>
        </S.ButtonContainer>
      </S.ValueViewer>
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
