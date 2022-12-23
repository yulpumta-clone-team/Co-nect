import { ROUTE } from 'constant/route.constant';
import React from 'react';
import * as S from './style';

export default function Main() {
  return (
    <S.MainContainer>
      <S.Section1>
        <S.MainGradient>
          <S.Logo />
          <S.MainText>What is Co-nect</S.MainText>
          <S.SubText>
            <span>코넥트는 사람과 사람의 연결을 의미합니다.</span>
            맞잡은 손을 이용해 코넥트가 표현하고자 하는 연결의 의미를 나타내었습니다.
          </S.SubText>
        </S.MainGradient>
      </S.Section1>
      <S.Section2>
        <S.Section2BG>
          <span>코넥트</span>는 무엇을 위해 만들어졌을까요?
        </S.Section2BG>
      </S.Section2>
      <S.Section3>
        <S.CircleGroup>
          <S.section3Circle1>팀원들을 한 페이지에서 간단하게 만날 수 있습니다.</S.section3Circle1>
          <S.section3Circle2>프로젝트를 여러 사람에게 소개할 수 있습니다.</S.section3Circle2>
          <S.section3Circle3>같은 목표를 가진 사람들을 만날 수 있습니다.</S.section3Circle3>
        </S.CircleGroup>
      </S.Section3>
      <S.Section4>
        <S.Section4Text>
          우리는 이런 <span>연결이 필요한 사람들</span>,<br /> 세상의 모든 <span>“코넥티”</span>들을
          위한 사이트를 만들기로 했습니다.
        </S.Section4Text>
      </S.Section4>
      <S.Section5>
        <S.Card>
          <S.FirstCardIcon2 />
          <S.FirstCardIcon1 />
          <S.CardText>
            <span>
              코넥트는
              <br />
              이런 어플입니다.
            </span>
            <br />한 페이지에서 나와 같은 목표를 가진 팀원을 만나보세요! 다양한 사람들과 함께 팀을
            구성해보세요. 목표가 같은 코넥티를 찾아 프로젝트를 진행해봐요!
          </S.CardText>
        </S.Card>
      </S.Section5>
      <S.Section6>
        <S.Card>
          <S.SecondCardIcon1 />
          <S.SecondCardIcon2 />
          <S.CardText>
            <span>
              내가 원하는
              <br />
              코넥티만을 골라서
            </span>
            <br />
            수많은 코넥티 중 기술, 직업, 희망 작업 기간 등을 필터링해 내 프로젝트에 딱 맞는 코넥티를
            빠르고 쉽게 서치할 수 있습니다.
          </S.CardText>
        </S.Card>
      </S.Section6>
      <S.Section7>
        <S.Card>
          <S.ThirdCardIcon1 />
          <S.ThirdCardIcon2 />
          <S.CardText>
            <span>페이지에서 카드를 통해 빠르게</span>
            <br />
            프로젝트에 필수적인 정보만 보고 싶다! 모집분야, 기술스택 진행기간 등의 프로젝트 정보를
            심플한 카드 형식에 담아 한눈에 볼 수 있습니다.
          </S.CardText>
        </S.Card>
      </S.Section7>
      <S.Section8>
        <span>코넥티들을 위한 도전은 계속됩니다.</span>
        <S.LinkGroup>
          <S.SignUpLink onClick={ROUTE.SIGN_UP} />
          <S.BoardLink onClick={ROUTE.TEAM} />
          <S.PostLink onClick={ROUTE.NEW_POST} />
        </S.LinkGroup>
      </S.Section8>
      <S.BottomBox>
        <S.TextBox>
          <span>커넥트 프로젝트</span>
          <br />
          김윤호 프론트 abcd@gmail.com
          <br />
          김윤호 프론트 abcd@gmail.com
          <br />
          김윤호 프론트 abcd@gmail.com
          <br />
          김윤호 프론트 abcd@gmail.com
        </S.TextBox>
      </S.BottomBox>
    </S.MainContainer>
  );
}