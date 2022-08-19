import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { userCardType } from 'types/user.type';
import heartIcon from 'assets/icons/heart.svg';
import checkIcon from 'assets/icons/check-button.svg';
import crossIcon from 'assets/icons/cross-button.svg';
import chat from 'assets/icons/chat.svg';
import view from 'assets/icons/view.svg';
import left_skill from 'assets/icons/left-skill.svg';
import right_skill from 'assets/icons/right-skill.svg';
import Slide from './Slide';

import * as S from './style';

UserCard.propTypes = {
  cardInfo: userCardType.isRequired,
  onClick: PropTypes.func,
};

export default function UserCard({ cardInfo, onClick }) {
  const TOTAL_SLIDES = 2;
  const { name, hopeSession, likeCnt, img, job, belong_team, skills } = cardInfo;
  const team = belong_team ? checkIcon : crossIcon;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  // Next 버튼 클릭 시
  const NextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      // 더 이상 넘어갈 슬라이드가 없으면
      setCurrentSlide(0); // 1번째 사진으로 넘어갑니다.
      // return;  // 클릭이 작동하지 않습니다.
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  // Prev 버튼 클릭 시
  const PrevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES); // 마지막 사진으로 넘어갑니다.
      // return;  // 클릭이 작동하지 않습니다.
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };
  useEffect(() => {
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 에니메이션을 만듭니다.
  }, [currentSlide]);
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
      <S.UserInfo>
        <S.Name>{name}</S.Name>
        <S.Team>
          현재 소속 여부 <img src={team} alt="현재 팀 소속 여부" />
        </S.Team>
        <S.Session>
          희망 기간 &nbsp; <S.UserSession>{hopeSession}</S.UserSession>
        </S.Session>
      </S.UserInfo>
      <S.Divider />
      <S.SkillBoard>
        <img src={left_skill} alt="arrow" onClick={PrevSlide} />
        <S.Skills>
          <S.Skill>
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
