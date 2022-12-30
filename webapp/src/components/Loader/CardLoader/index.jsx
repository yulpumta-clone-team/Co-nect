import React from 'react';
import HeartSvg from 'assets/icons/HeartSvg';
import ChevronLeftSvg from 'assets/icons/ChevronLeftSvg';
import ChevronRightSvg from 'assets/icons/ChevronRightSvg';
import * as S from './CardLoader.style';

export default function CardLoader() {
  return (
    <S.CardWrapper>
      <S.CardTop>
        <S.Heart>
          <HeartSvg />
        </S.Heart>
      </S.CardTop>
      <S.BackgroundImg>
        <S.TeamStatus />
      </S.BackgroundImg>
      <S.ProfileImg />
      <S.InfoContainer>
        <S.SingleInfo />
        <div>
          <S.SingleInfo width={100} />
          <S.SingleInfo width={60} />
        </div>
      </S.InfoContainer>
      <S.Divider />
      <S.SkillContainer>
        <S.LeftAngle>
          <ChevronLeftSvg />
        </S.LeftAngle>
        <S.SkillSlide>
          {Array(5)
            .fill(0)
            .map(() => (
              <S.SkillImage />
            ))}
        </S.SkillSlide>
        <S.RightAngle>
          <ChevronRightSvg />
        </S.RightAngle>
      </S.SkillContainer>
      <S.CardInfoIndicator>
        {Array(2)
          .fill(0)
          .map(() => (
            <S.SingleIndicator>
              <div />
              <div />
            </S.SingleIndicator>
          ))}
      </S.CardInfoIndicator>
    </S.CardWrapper>
  );
}
