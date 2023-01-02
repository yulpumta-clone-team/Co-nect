import React from 'react';
import PropTypes from 'prop-types';
import { skillStackParser } from 'service/etc/skillStack.parser';
import TechSkillCarousel from './TechSkillCarousel';
import TechSkillNormal from './TechSkillNormal';
import * as S from './TechSkills.style';
import EmptyTechSkills from './EmptyTechSkills';

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

  if (parsedTechSkills.length === 0) return <EmptyTechSkills />;

  return (
    <S.SkillBoard
      customStyle={customStyle}
      width={width}
      height={height}
      onClick={(event) => event.stopPropagation()}
    >
      {isCarousel ? (
        <TechSkillCarousel skills={parsedTechSkills} imageSize={imageSize} gap={gap} />
      ) : (
        <TechSkillNormal skills={parsedTechSkills} imageSize={imageSize} gap={gap} />
      )}
    </S.SkillBoard>
  );
}
