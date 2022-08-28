import React from 'react';
import PropTypes from 'prop-types';
import { skillStackParser } from 'service/skillStack.parser';
import TechSkillCarousel from './TechSkillCarousel';
import TechSkillNormal from './TechSkillNormal';
import * as S from './TechSkills.style';

TechSkills.propTypes = {
  skills: PropTypes.array.isRequired,
  isCarousel: PropTypes.bool,
  imageSize: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  gap: PropTypes.string,
  customStyle: PropTypes.array,
};

export default function TechSkills({
  isCarousel = false,
  skills,
  imageSize,
  width,
  height,
  gap,
  customStyle,
}) {
  const parsedTechSkills = skillStackParser(skills);

  return (
    <S.SkillBoard customStyle={customStyle} width={width} height={height}>
      {isCarousel ? (
        <TechSkillCarousel skills={parsedTechSkills} imageSize={imageSize} gap={gap} />
      ) : (
        <TechSkillNormal skills={parsedTechSkills} imageSize={imageSize} gap={gap} />
      )}
    </S.SkillBoard>
  );
}
