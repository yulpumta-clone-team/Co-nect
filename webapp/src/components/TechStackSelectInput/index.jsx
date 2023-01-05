import React from 'react';
import PropTypes from 'prop-types';
import useDropdown from 'hooks/useDropdown';
import { parsedTechStackType } from 'types/techSkill.type';
import { skillStackParser } from 'service/etc/skillStack.parser';
import useAxios from 'hooks/useAxios';
import etcApi from 'api/etc.api';
import TechStackSelectedViewer from './TechStackSelectedViewer';
import TechStackOptions from './TechStackOptions';
import * as S from './TechStackSelectInput.style';

TechStackSelectInput.propTypes = {
  selectedTechSkills: PropTypes.arrayOf(parsedTechStackType).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isDropdownType: PropTypes.bool,
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
  isDropdownType = true,
  isError = false,
  helperText,
  customStyle,
  height,
  width,
  ...rest
}) {
  const { parent, isDropdownOpen, openDropdown, closeDropdown } = useDropdown();

  const {
    state: techStackOptionsApiState,
    getExecution,
    forceRefetch: forceRefetchTeckStackOptions,
  } = useAxios({
    axiosInstance: etcApi.getTechStackAll,
  });

  const techSkillOptions = techStackOptionsApiState.responseData
    ? skillStackParser(techStackOptionsApiState.responseData)
    : [];

  // const techSkillOptions = skillStackParser(TECH_SKILLS);

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
      {isDropdownType && (
        <TechStackSelectedViewer
          isError={isError}
          parent={parent}
          isDropdownOpen={isDropdownOpen}
          isValues={isValues}
          isLoading={techStackOptionsApiState.isLoading}
          helperText={helperText}
          selectedTechSkills={selectedTechSkills}
          handleClickTargetDelete={handleClickTargetDelete}
          placeholder={placeholder}
          handleClickReset={handleClickReset}
          closeDropdown={closeDropdown}
        />
      )}
      {!isDropdownType && isError && <S.Error>{helperText}</S.Error>}
      <S.Select isDropdownOpen={isDropdownOpen} isDropdownType={!isDropdownType}>
        <TechStackOptions
          techStackOptionsApiState={techStackOptionsApiState}
          forceRefetchTeckStackOptions={forceRefetchTeckStackOptions}
          selectedTechSkills={selectedTechSkills}
          techSkillOptions={techSkillOptions}
          handleClickOption={handleClickOption}
        />
      </S.Select>
    </S.Container>
  );
}
