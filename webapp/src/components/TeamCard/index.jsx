import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { teamCardType } from 'types/team.type';

import * as S from './style';

TeamCard.propTypes = {
  cardInfo: teamCardType.isRequired,
  onClick: PropTypes.func,
};

// * 임시 데이터
const javascriptUrl =
  'https://user-images.githubusercontent.com/71386219/186051220-a77fa08e-b501-4baa-af3c-47ae602d25e1.png';
export const skillsImg = [
  { id: 0, imageUrl: javascriptUrl, label: 'javascript' },
  { id: 1, imageUrl: javascriptUrl, label: 'javascript' },
  { id: 2, imageUrl: javascriptUrl, label: 'javascript' },
  { id: 3, imageUrl: javascriptUrl, label: 'javascript' },
  { id: 4, imageUrl: javascriptUrl, label: 'javascript' },
  { id: 5, imageUrl: javascriptUrl, label: 'javascript' },
  { id: 6, imageUrl: javascriptUrl, label: 'javascript' },
  { id: 7, imageUrl: javascriptUrl, label: 'javascript' },
  { id: 8, imageUrl: javascriptUrl, label: 'javascript' },
];

export default function TeamCard({ cardInfo, onClick }) {
  // * : teamCard 에 표시되는 정보
  const { user, name, hopeSession, img, status } = cardInfo;
  // * : 현재 슬라이드를 나타내는 useState
  const [currentSlide, setCurrentSlide] = useState(0);
  // * : Slide 넘어가는 effect
  const slideRef = useRef(null);
  const viewingSkill = 5;
  // * : 현재 슬라이드를 제외한 Slide 개수
  const TOTAL_SLIDES = skillsImg.length / viewingSkill - 1;
  const firstSlide = 0;
  const handleClickNextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(firstSlide);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  // * : Prev 버튼 클릭 시
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

  // ! : Slide 부분을 위해 mock data skillsImg를 생성하고 map을 활용해보려 했는데, 잘 작동시키지 못했습니다. 도움 요청합니다 ㅠ.ㅠ
  return (
    <S.CardWrapper onClick={onClick}>
      <S.CardTop>
        <S.Heart />
      </S.CardTop>
      <S.BackgroundImg>
        <S.TeamStatus>{status}</S.TeamStatus>
      </S.BackgroundImg>
      <S.ProfileImg src={img} alt="프로필" />
      <S.TeamInfo>
        <S.UserName>{user}님의 모집</S.UserName>
        <S.TeamName>{name}</S.TeamName>

        <S.HopeSession>
          예상 기간 &nbsp; <S.TeamHopeSession>{hopeSession}</S.TeamHopeSession>
        </S.HopeSession>
      </S.TeamInfo>
      <S.Divider />
      <S.SkillBoard>
        <S.LeftAngle onClick={handleClickPrevSlide} />
        <S.SkillContainer>
          <S.SkillSlide ref={slideRef}>
            {skillsImg.map(({ imageUrl, id }) => (
              <S.SkillImage key={id} src={imageUrl} />
            ))}
          </S.SkillSlide>
        </S.SkillContainer>
        <S.RightAngle onClick={handleClickNextSlide} />
      </S.SkillBoard>
      <S.CountBoard>
        <S.Chat />
        000
        <S.View />
        000
      </S.CountBoard>
    </S.CardWrapper>
  );
}
