import React from 'react';
import PropTypes from 'prop-types';
import useDropdown from 'hooks/useDropdown';
import { parsedTechStackType } from 'types/techSkill.type';
import { skillStack } from 'constant';
import { skillStackParser } from 'service/skillStack.parser';
import * as S from './TechStackSelectInput.style';

TechStackSelectInputView.propTypes = {
  selectedTechSkills: PropTypes.arrayOf(parsedTechStackType).isRequired,
  skillStack: PropTypes.array.isRequired,
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

export default function TechStackSelectInputView({
  selectedTechSkills,
  skillStack,
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
  const techSkillOptions = skillStackParser(skillStack);
  const { parent, isDropdownOpen, openDropdown, closeDropdown } = useDropdown();
  const AngleButton = isDropdownOpen ? S.UpAngle : S.DownAngle;
  // FIXME: 아래 로직을 조금 더 깔끔하게 수정할 수 없을까?
  const handleClickOption = ({ targetId }) => {
    const targetTechSkill = techSkillOptions.find((techSkill) => techSkill.id === targetId);
    const isTargetInSelectedTechSkills = selectedTechSkills.find(
      (techSkill) => techSkill.id === targetId,
    );
    if (isTargetInSelectedTechSkills) {
      onChange({ name, value: [...selectedTechSkills] });
    } else {
      onChange({ name, value: [...selectedTechSkills, targetTechSkill] });
    }
  };

  const isValues = selectedTechSkills.length !== 0;

  const handleClickTargetDelete = ({ targetId }) => {
    const filteredTechSkills = selectedTechSkills.filter((techSkill) => techSkill.id !== targetId);
    onChange({ name, value: [...filteredTechSkills] });
  };

  const handleClickReset = () => {
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
        {isValues ? (
          <S.SelectedStacks>
            {selectedTechSkills.map(({ id, label, value }) => (
              <S.SingleStack key={id}>
                <span>{label}</span>
                <S.CloseNormal onClick={() => handleClickTargetDelete({ targetId: id })} />
              </S.SingleStack>
            ))}
          </S.SelectedStacks>
        ) : (
          <S.PlaceHolder>{placeholder}</S.PlaceHolder>
        )}
        <S.ButtonContainer>
          {selectedTechSkills && (
            <>
              <S.ClearableButton onClick={handleClickReset}>
                <S.CloseNormal />
              </S.ClearableButton>
              <S.ButtonDivider isRow={false} />
            </>
          )}
          <AngleButton onClick={closeDropdown} />
        </S.ButtonContainer>
      </S.ValueViewer>
      {isError && <S.Error>{helperText}</S.Error>}
      <S.Select isDropdownOpen={isDropdownOpen}>
        {techSkillOptions.map(({ id, value, label }) => (
          <S.Option key={id} value={value} onClick={() => handleClickOption({ targetId: id })}>
            {label}
          </S.Option>
        ))}
      </S.Select>
    </S.Container>
  );
}
