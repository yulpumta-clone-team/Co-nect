import React from 'react';
import PropTypes from 'prop-types';
import etcApi from 'api/etc.api';
import useDropdown from 'hooks/useDropdown';
import { parsedTechStackType } from 'types/techSkill.type';
import useAxios from 'hooks/useAxios';
import { skillStackParser } from 'service/skillStack.parser';
import TechStackSelectedViewer from './TechStackSelectedViewer';
import TechStackOptions from './TechStackOptions';
import * as S from './TechStackSelectInput.style';

TechStackSelectInput.propTypes = {
  selectedTechSkills: PropTypes.arrayOf(parsedTechStackType).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  showSelectedOption: PropTypes.bool,
  label: PropTypes.string,
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
  showSelectedOption = false,
  isError = false,
  helperText,
  customStyle,
  height,
  width,
  ...rest
}) {
  const [techStackOptionsApiState] = useAxios({ axiosInstance: etcApi.getTechStackAll });

  const { parent, isDropdownOpen, openDropdown, closeDropdown } = useDropdown();

  const techSkillOptions = techStackOptionsApiState.responseData
    ? skillStackParser(techStackOptionsApiState.responseData)
    : [];

  const isValues = selectedTechSkills.length !== 0;

  const deleteTarget = (targetId) => {
    const filteredTechSkills = selectedTechSkills.filter((techSkill) => techSkill.id !== targetId);
    onChange({ name, value: [...filteredTechSkills] });
  };

  const addTarget = (targetTechSkill) => {
    onChange({ name, value: [...selectedTechSkills, targetTechSkill] });
  };

  const handleClickTargetDelete = ({ targetId }) => {
    deleteTarget(targetId);
  };

  const handleClickReset = () => {
    onChange({ name, value: [] });
  };

  const handleClickOption = ({ targetId }) => {
    const targetTechSkill = techSkillOptions.find((techSkill) => techSkill.id === targetId);
    const isTargetInSelectedTechSkills = selectedTechSkills.find(
      (techSkill) => techSkill.id === targetId,
    );
    if (!targetTechSkill) return;
    if (isTargetInSelectedTechSkills) {
      deleteTarget(targetId);
    } else {
      addTarget(targetTechSkill);
    }
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
      {showSelectedOption && (
        <TechStackSelectedViewer
          isError={isError}
          parent={parent}
          isDropdownOpen={isDropdownOpen}
          isValues={isValues}
          isLoading={techStackOptionsApiState.isLoading}
          selectedTechSkills={selectedTechSkills}
          handleClickTargetDelete={handleClickTargetDelete}
          placeholder={placeholder}
          handleClickReset={handleClickReset}
          closeDropdown={closeDropdown}
        />
      )}
      {isError && <S.Error>{helperText}</S.Error>}
      <TechStackOptions
        showSelectedOption={showSelectedOption}
        selectedTechSkills={selectedTechSkills}
        techSkillOptions={techSkillOptions}
        techStackOptionsApiState={techStackOptionsApiState}
        handleClickOption={handleClickOption}
      />
    </S.Container>
  );
}
