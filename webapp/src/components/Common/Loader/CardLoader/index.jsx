import React from 'react';
import HeartSvg from 'assets/icons/HeartSvg';
import ChevronLeftSvg from 'assets/icons/ChevronLeftSvg';
import ChevronRightSvg from 'assets/icons/ChevronRightSvg';
import SimpleListComponent from 'hoc/SimpleListComponent';
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
          <SimpleListComponent Component={S.SkillImage} idx={5} />
        </S.SkillSlide>
        <S.RightAngle>
          <ChevronRightSvg />
        </S.RightAngle>
      </S.SkillContainer>
      <S.CardInfoIndicator>
        <SimpleListComponent Component={SingleIndicator} idx={2} />
      </S.CardInfoIndicator>
    </S.CardWrapper>
  );
}

function SingleIndicator() {
  return (
    <S.SingleIndicator>
      <div />
      <div />
    </S.SingleIndicator>
  );
}
