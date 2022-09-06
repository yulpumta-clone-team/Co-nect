import React from 'react';
import PropTypes from 'prop-types';
import Divider from 'components/Common/Divider';
import * as S from './TechStackSelectInput.style';

TechStackOptions.propTypes = {
  techSkillOptionsWithCategory: PropTypes.object.isRequired,
  handleClickOption: PropTypes.func.isRequired,
};

export default function TechStackOptions({ techSkillOptionsWithCategory, handleClickOption }) {
  return (
    <>
      {Object.entries(techSkillOptionsWithCategory).map(([category, categoryList]) => (
        <S.OptionCategory key={category}>
          <S.OptionCategoryName>{category}</S.OptionCategoryName>
          <Divider customStyle={S.CategoryDivider} />
          <S.Options>
            {categoryList.map(({ id, value, label, image }) => (
              <S.Option key={id} value={value} onClick={() => handleClickOption({ targetId: id })}>
                <img src={image} alt={label} />
              </S.Option>
            ))}
          </S.Options>
        </S.OptionCategory>
      ))}
    </>
  );
}
