import React from 'react';
import PropTypes from 'prop-types';
import { parsedTechStackType } from 'types/techSkill.type';
import WithLoading from 'hoc/WithLoading';
import etcApi from 'api/etc.api';
import TechStackSelectInputView from './TechStackSelectInput.view';

TechStackSelectInput.propTypes = {
  selectedTechSkills: PropTypes.arrayOf(parsedTechStackType).isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isError: PropTypes.bool,
  helperText: PropTypes.string,
  defaultOption: PropTypes.object,
  customStyle: PropTypes.array,
  height: PropTypes.string,
  width: PropTypes.string,
};

export default function TechStackSelectInput({
  selectedTechSkills,
  onChange,
  label,
  placeholder,
  name,
  defaultOption,
  isError = false,
  helperText,
  customStyle,
  height,
  width,
  ...rest
}) {
  const TechSstackSelectInputViewWithLoading = WithLoading({
    Component: TechStackSelectInputView,
    responseDataKey: 'skillStack',
    axiosInstance: etcApi.getTechStackAll,
  });
  return (
    <TechSstackSelectInputViewWithLoading
      selectedTechSkills={selectedTechSkills}
      onChange={onChange}
      label={label}
      placeholder={placeholder}
      name={name}
      isError={isError}
      helperText={helperText}
      defaultOption={defaultOption}
      customStyle={customStyle}
      height={height}
      width={width}
    />
  );
}
