import { useEffect, useRef, useState } from 'react';

/**
 * useSkillCarousel가 동작하기 위해 외부에서 주입해야하는 params
 * @typedef {Object} useSkillCarouselParams
 * @property {array} skills 캐러셀에서 보여줄 기술스택 목록
 * @property {number} viewingSkill 한 화면에 보여줄 기술스택 수
 */

/**
 * useSkillCarousel를 사용하는 곳에서 사용할 method 및 state
 * @typedef {Object} useSkillCarouselReturns
 * @property {Object} slideRef carousel container에 등록한 useRef 객체
 * @property {() => void} handleClickNextSlide 캐러셀 왼쪽으로 이동하는 함수
 * @property {() => void} handleClickPrevSlide 캐러셀 오른쪽으로 이동하는 함수
 */

/**
 * 기술스택 캐러셀 로직을 위한 custom hooks
 * @param {useSkillCarouselParams} useSkillCarouselParams useSkillCarousel가 동작하기 위해 외부에서 주입해야하는 params
 * @returns {useSkillCarouselReturns} useSkillCarousel를 사용하는 곳에서 사용할 method 및 state
 */
const useSkillCarousel = ({ skills, viewingSkill }) => {
  // 현재 슬라이드를 나타내는 useState
  const [currentSlide, setCurrentSlide] = useState(0);
  // Slide 넘어가는 effect
  const slideRef = useRef(null);
  // 현재 슬라이드를 제외한 Slide 개수
  const TOTAL_SLIDES = skills.length / viewingSkill - 1;

  const INIT_SLIDE = 0;

  const handleClickNextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(INIT_SLIDE);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleClickPrevSlide = () => {
    if (currentSlide === INIT_SLIDE) {
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
