import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { userCardType } from 'types/user.type';
import heartIcon from 'assets/icons/heart.svg';
import checkIcon from 'assets/icons/check-button.svg';
import crossIcon from 'assets/icons/cross-button.svg';
import chat from 'assets/icons/chat.svg';
import view from 'assets/icons/view.svg';

import * as S from './style';

UserCard.propTypes = {
  cardInfo: userCardType.isRequired,
  onClick: PropTypes.func,
};

const javascriptUrl =
  'https://user-images.githubusercontent.com/71386219/186051220-a77fa08e-b501-4baa-af3c-47ae602d25e1.png';

export const skillsImg = [
  { id: 1, imageUrl: javascriptUrl, label: 'javascript' },
  { id: 0, imageUrl: javascriptUrl, label: 'javascript' },
  { id: 2, imageUrl: javascriptUrl, label: 'javascript' },
  { id: 3, imageUrl: javascriptUrl, label: 'javascript' },
  { id: 4, imageUrl: javascriptUrl, label: 'javascript' },
  { id: 5, imageUrl: javascriptUrl, label: 'javascript' },
  { id: 6, imageUrl: javascriptUrl, label: 'javascript' },
  { id: 7, imageUrl: javascriptUrl, label: 'javascript' },
  { id: 8, imageUrl: javascriptUrl, label: 'javascript' },
];

export default function UserCard({ cardInfo, onClick }) {
  // * : userCard 에 표시되는 정보
  const { name, hopeSession, img, job, belong_team } = cardInfo;
  // * : team 소속여부에 따른 아이콘 변경
  const team = belong_team ? checkIcon : crossIcon;
  // * : 현재 슬라이드를 나타내는 useState
  const [currentSlide, setCurrentSlide] = useState(0);
  // * : Slide 넘어가는 effect
  const slideRef = useRef(null);
  // * : Slide 개수
  const temp = 5;
  const TOTAL_SLIDES = skillsImg.length / temp;

  const handleClickNextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleClickPrevSlide = () => {
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
        <S.LeftAngle onClick={handleClickPrevSlide} />
        <S.SkillContainer>
          <S.Skill ref={slideRef}>
            {skillsImg.map(({ imageUrl, id }) => (
              <S.SkillImage key={id} src={imageUrl} />
            ))}
          </S.Skill>
        </S.SkillContainer>
        <S.RightAngle onClick={handleClickNextSlide} />
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
