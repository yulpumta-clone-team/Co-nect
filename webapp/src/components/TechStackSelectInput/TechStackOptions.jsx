import React from 'react';
import PropTypes from 'prop-types';
import Divider from 'components/Common/Divider';
import { skillStackParserWithCategory } from 'service/etc/skillStack.parser';
import Callback from 'pages/Callback';
import Spinner from 'components/Common/Loader/Spinner';
import * as S from './TechStackSelectInput.style';

TechStackOptions.propTypes = {
  techSkillOptions: PropTypes.array.isRequired,
  selectedTechSkills: PropTypes.array.isRequired,
  handleClickOption: PropTypes.func.isRequired,
  techStackOptionsApiState: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    responseData: PropTypes.array,
    error: PropTypes.object,
  }).isRequired,
  forceRefetchTeckStackOptions: PropTypes.func.isRequired,
};

export default function TechStackOptions({
  selectedTechSkills,
  techSkillOptions,
  handleClickOption,
  techStackOptionsApiState,
  forceRefetchTeckStackOptions,
}) {
  if (techStackOptionsApiState.isLoading)
    return (
      <S.SpinnerContainer>
        <Spinner withLogo />
      </S.SpinnerContainer>
    );
  if (techStackOptionsApiState.error) {
    const { error } = techStackOptionsApiState;
    return (
      <S.OptionCategory>
        <Callback
          errorStatus={error.httpStatus}
          errorMessage={error.message}
          forceRefetch={forceRefetchTeckStackOptions}
        />
      </S.OptionCategory>
    );
  }
  const isSelected = (targetId) => !!selectedTechSkills.find((option) => option.id === targetId);

  const techSkillOptionsWithCategory = skillStackParserWithCategory(techSkillOptions);

  return (
    <>
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
    </>
  );
}
