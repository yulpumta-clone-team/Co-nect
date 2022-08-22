import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { teamCardType } from 'types/team.type';
import heartIcon from 'assets/icons/heart.svg';
import chat from 'assets/icons/chat.svg';
import view from 'assets/icons/view.svg';
import left_skill from 'assets/icons/left-skill.svg';
import right_skill from 'assets/icons/right-skill.svg';
import { skillsImg } from 'mocks/teckStack/skillsImg';
import Slide from './Slide';

import * as S from './style';

TeamCard.propTypes = {
  cardInfo: teamCardType.isRequired,
  onClick: PropTypes.func,
};

export default function TeamCard({ cardInfo, onClick }) {
  // * : teamCard 에 표시되는 정보
  const { user, name, hopeSession, img, job } = cardInfo;
  // * : 현재 슬라이드를 나타내는 useState
  const [currentSlide, setCurrentSlide] = useState(0);
  // * : Slide 넘어가는 effect
  const slideRef = useRef(null);
  // * : Slide 개수
  const TOTAL_SLIDES = skillsImg.length / 5;
  // * : Next 버튼 클릭 시
  const NextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  // * : Prev 버튼 클릭 시
  const PrevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };
  useEffect(() => {
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  // ! : Slide 부분을 위해 mock data skillsImg를 생성하고 map을 활용해보려 했는데, 잘 작동시키지 못했습니다. 도움 요청합니다 ㅠ.ㅠ
  return (
    <S.CardWrapper onClick={onClick}>
      <S.CardTop>
        <S.Heart>
          <img src={heartIcon} alt="Heart" />
        </S.Heart>
      </S.CardTop>
      <S.BackgroundImg>
        <S.Job>{job}</S.Job>
      </S.BackgroundImg>
      <S.ProfileImg src={img} alt="프로필" />
      <S.TeamInfo>
        <S.UserName>{user}님의 모집</S.UserName>
        <S.TeamName>{name}</S.TeamName>

        <S.Session>
          예상 기간 &nbsp; <S.UserSession>{hopeSession}</S.UserSession>
        </S.Session>
      </S.TeamInfo>
      <S.Divider />
      <S.SkillBoard>
        <img src={left_skill} alt="arrow" onClick={PrevSlide} />
        <S.Skills>
          <S.Skill ref={slideRef}>
            <Slide img={img} />
            <Slide img={img} />
            <Slide img={img} />
            <Slide img={img} />
            <Slide img={img} />
          </S.Skill>
        </S.Skills>
        <img src={right_skill} alt="arrow" onClick={NextSlide} />
      </S.SkillBoard>
      <S.CountBoard>
        <img src={chat} alt="profile" />
        000
        <img src={view} alt="profile" />
        000
      </S.CountBoard>
    </S.CardWrapper>
  );
}
