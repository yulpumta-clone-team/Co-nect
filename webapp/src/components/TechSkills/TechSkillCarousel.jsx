import React from 'react';
import PropTypes from 'prop-types';
import useSkillCarousel from 'hooks/useSkillCarousel';
import ChevronLeftSvg from 'assets/icons/ChevronLeftSvg';
import ChevronRightSvg from 'assets/icons/ChevronRightSvg';
import * as S from './TechSkills.style';

TechSkillCarousel.propTypes = {
  skills: PropTypes.array.isRequired,
  imageSize: PropTypes.string,
  gap: PropTypes.string,
};

export default function TechSkillCarousel({ skills, imageSize, gap }) {
  const { slideRef, handleClickNextSlide, handleClickPrevSlide } = useSkillCarousel({
    skills,
    viewingSkill: 5,
  });

  return (
    <>
      <S.LeftAngle onClick={handleClickPrevSlide}>
        <ChevronLeftSvg />
      </S.LeftAngle>
      <S.SkillContainer isCarousel>
        <S.SkillSlide ref={slideRef} isCarousel gap={gap}>
          {skills.map(({ image, id }) => (
            <S.SkillImage key={id} src={image} imageSize={imageSize} />
          ))}
        </S.SkillSlide>
      </S.SkillContainer>
      <S.RightAngle onClick={handleClickNextSlide}>
        <ChevronRightSvg />
      </S.RightAngle>
    </>
  );
}
