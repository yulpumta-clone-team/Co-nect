import React from 'react';
import PropTypes from 'prop-types';
import * as S from './TechSkills.style';

TechSkills.propTypes = {
  skills: PropTypes.array.isRequired,
  imageSize: PropTypes.string,
  gap: PropTypes.string,
};

export default function TechSkills({ skills, imageSize, gap }) {
  return (
    <S.SkillContainer isCarousel={false}>
      <S.SkillSlide isCarousel={false} gap={gap}>
        {skills.map(({ image, id }) => (
          <S.SkillImage key={id} src={image} imageSize={imageSize} />
        ))}
      </S.SkillSlide>
    </S.SkillContainer>
  );
}
