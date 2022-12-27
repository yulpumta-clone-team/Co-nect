import { ROUTE } from 'constant/route.constant';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

export default function Main() {
  const navigate = useNavigate();
  const benefits = [
    { first: '팀원들을 한 페이지에서', second: '간단하게 만날 수 있습니다.' },
    { first: '프로젝트를 여러 사람에게', second: '소개할 수 있습니다.' },
    { first: '같은 목표를 가진', second: '사람들을 만날 수 있습니다.' },
  ];
  const links = [
    { icon: <S.SignUp />, route: ROUTE.SIGN_UP },
    { icon: <S.Board />, route: ROUTE.TEAM },
    { icon: <S.Post />, route: ROUTE.NEW_POST },
  ];
  const cardText = [
    {
      spanFirst: '코넥트는',
      spanSecond: '이런 어플입니다.',
      default:
        '한 페이지에서 나와 같은 목표를 가진 팀원을 만나보세요! 다양한 사람들과 함께 팀을 구성해보세요.목표가 같은 코넥티를 찾아 프로젝트를 진행해봐요!',
      iconFront: <S.Cloud />,
      iconBehind: <S.Ghost />,
    },
    {
      spanFirst: ' 내가 원하는',
      spanSecond: '코넥티만을 골라서',
      default:
        ' 수많은 코넥티 중 기술, 직업, 희망 작업 기간 등을 필터링해 내 프로젝트에 딱 맞는 코넥티를 빠르고 쉽게 서치할 수 있습니다.',
      iconFront: <S.Earth />,
      iconBehind: <S.HeartPoint />,
    },
    {
      spanFirst: '한 페이지에서',
      spanSecond: '카드를 통해 빠르게',
      default:
        '프로젝트에 필수적인 정보만 보고 싶다! 모집분야, 기술스택 진행기간 등의 프로젝트 정보를 심플한 카드 형식에 담아 한눈에 볼 수 있습니다.',
      iconFront: <S.CellPhone />,
      iconBehind: <S.Message />,
    },
  ];
  const developers = [
    { name: '김윤호', field: '프론트', email: 'abc@naver.com' },
    { name: '김윤호', field: '프론트', email: 'abc@naver.com' },
    { name: '김윤호', field: '프론트', email: 'abc@naver.com' },
    { name: '김윤호', field: '프론트', email: 'abc@naver.com' },
  ];
  return (
    <S.MainContainer>
      <S.MainSection>
        <S.MainGradient>
          <S.Logo />
          <S.MainText>What is Co-nect</S.MainText>
          <S.SubText>
            <span>코넥트는 사람과 사람의 연결을 의미합니다.</span>
            맞잡은 손을 이용해 코넥트가 표현하고자 하는 연결의 의미를 나타내었습니다.
          </S.SubText>
        </S.MainGradient>
      </S.MainSection>
      <S.PurposeSection>
        <S.StartQuestion>
          <S.Image3D>
            <span>코넥트</span>는 무엇을 위해 만들어졌을까요?
          </S.Image3D>
        </S.StartQuestion>
        <S.Benefit>
          <S.CircleGroup>
            {benefits.map((benefit, index) => (
              <S.Circle>
                <p>{benefit.first}</p>
                {benefit.second}
              </S.Circle>
            ))}
          </S.CircleGroup>
        </S.Benefit>
        <S.Subject>
          <S.TextFirstLine>
            우리는 이런 <span> 연결이 필요한 사람들</span>,
          </S.TextFirstLine>
          <S.TextSecondLine>
            세상의 모든 <span>“코넥티”</span>들을 위한 사이트를 만들기로 했습니다.
          </S.TextSecondLine>
        </S.Subject>
      </S.PurposeSection>
      <S.FunctionSection>
        {cardText.map((text, index) => (
          <S.Card>
            {text.iconFront}
            {text.iconBehind}
            <S.CardText>
              <span>
                {text.spanFirst}
                <br />
                {text.spanSecond}
              </span>
              <br />
              {text.default}
            </S.CardText>
          </S.Card>
        ))}
      </S.FunctionSection>
      <S.FinishSection>
        <span>코넥티들을 위한 도전은 계속됩니다.</span>
        <S.LinkGroup>
          {links.map((link, index) => (
            <S.GotoLink onClick={() => navigate(link.route)}>{link.icon}</S.GotoLink>
          ))}
        </S.LinkGroup>
      </S.FinishSection>
      <S.BottomBox>
        {developers.map((developer, index) => (
          <S.InformationBox>
            {developer.name} {developer.field} {developer.email}
          </S.InformationBox>
        ))}
      </S.BottomBox>
    </S.MainContainer>
  );
}
