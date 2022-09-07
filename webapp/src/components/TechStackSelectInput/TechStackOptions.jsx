import React from 'react';
import PropTypes from 'prop-types';
import Divider from 'components/Common/Divider';
import { skillStackParserWithCategory } from 'service/skillStack.parser';
import * as S from './TechStackSelectInput.style';

TechStackOptions.propTypes = {
  techStackOptionsApiState: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    responseData: PropTypes.object,
    error: PropTypes.object,
  }).isRequired,
  techSkillOptions: PropTypes.array.isRequired,
  selectedTechSkills: PropTypes.array.isRequired,
  handleClickOption: PropTypes.func.isRequired,
};

export default function TechStackOptions({
  techStackOptionsApiState,
  selectedTechSkills,
  techSkillOptions,
  handleClickOption,
}) {
  if (techStackOptionsApiState.isLoading) return <div>...</div>;
  if (techStackOptionsApiState.error) return <div>...</div>;

  const isSelected = (targetId) => !!selectedTechSkills.find((option) => option.id === targetId);

  const techSkillOptionsWithCategory = skillStackParserWithCategory(techSkillOptions);
  return (
    <S.Select isDropdownOpen>
      {Object.entries(techSkillOptionsWithCategory).map(([category, categoryList]) => (
        <S.OptionCategory key={category}>
          <S.OptionCategoryName>{category}</S.OptionCategoryName>
          <Divider customStyle={S.CategoryDivider} />
          <S.Options>
            {categoryList.map(({ id, value, label, image }) => (
              <S.Option
                key={id}
                value={value}
                isSelected={isSelected(id)}
                onClick={() => handleClickOption({ targetId: id })}
              >
                <img src={image} alt={label} />
              </S.Option>
            ))}
          </S.Options>
        </S.OptionCategory>
      ))}
    </S.Select>
  );
}
