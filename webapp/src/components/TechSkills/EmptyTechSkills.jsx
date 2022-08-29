import React from 'react';
import PropTypes from 'prop-types';
import * as S from './TechSkills.style';

EmptyTechSkills.propTypes = {
  imageSize: PropTypes.string,
};

export default function EmptyTechSkills({ imageSize }) {
  return <S.EmptySkillSlide imageSize={imageSize}>선택된 언어가 없습니다.</S.EmptySkillSlide>;
}
