import { useEffect, useRef, useState } from 'react';

const useSkillCarousel = ({ skills, viewingSkill }) => {
  // * : 현재 슬라이드를 나타내는 useState
  const [currentSlide, setCurrentSlide] = useState(0);
  // * : Slide 넘어가는 effect
  const slideRef = useRef(null);
  // * : 현재 슬라이드를 제외한 Slide 개수
  const TOTAL_SLIDES = skills.length / viewingSkill - 1;

  const firstSlide = 0;

  const handleClickNextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(firstSlide);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleClickPrevSlide = () => {
    if (currentSlide === firstSlide) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  return { slideRef, handleClickNextSlide, handleClickPrevSlide };
};

export default useSkillCarousel;
