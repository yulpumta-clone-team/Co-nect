import React from 'react';
import { benefits, cardText, developers, links } from 'constant/main.constant';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

const IconMap = {
  signup: <S.SignUp />,
  board: <S.Board />,
  post: <S.Post />,
  cloud: <S.Cloud />,
  ghost: <S.Ghost />,
  earth: <S.Earth />,
  heartPoint: <S.HeartPoint />,
  cellPhone: <S.CellPhone />,
  message: <S.Message />,
};

export default function Main() {
  const navigate = useNavigate();
  return (
    <S.MainContainer>
      <S.MainSection>
        <S.MainGradient>
          <S.Logo />
          <S.MainText>
            <p>What is Co-nect</p>
          </S.MainText>
          <S.SubText>
            <p>
              <span>코넥트는 사람과 사람의 연결을 의미합니다.</span>
              맞잡은 손을 이용해 코넥트가 표현하고자 하는 연결의 의미를 나타내었습니다.
            </p>
          </S.SubText>
        </S.MainGradient>
      </S.MainSection>
      <S.PurposeSection>
        <S.StartQuestion>
          <S.Image3D>
            <p>
              <span>코넥트</span>는 무엇을 위해 만들어졌을까요?
            </p>
          </S.Image3D>
        </S.StartQuestion>
        <S.Benefit>
          <S.CircleGroup>
            {benefits.map(({ first, second }) => (
              <S.Circle key={first}>
                <span>{first}</span>
                {second}
              </S.Circle>
            ))}
          </S.CircleGroup>
        </S.Benefit>
        <S.Subject>
          <S.TextFirstLine>
            <p>
              우리는 이런 <span> 연결이 필요한 사람들</span>,
            </p>
          </S.TextFirstLine>
          <S.TextSecondLine>
            <p>
              세상의 모든 <span>“코넥티”</span>들을 위한 사이트를 만들기로 했습니다.
            </p>
          </S.TextSecondLine>
        </S.Subject>
      </S.PurposeSection>
      <S.FunctionSection>
        {cardText.map(({ spanFirst, spanSecond, iconFront, iconBehind, defaults }) => (
          <S.Card key={spanFirst}>
            {IconMap[iconFront]}
            {IconMap[iconBehind]}
            <S.CardText>
              <p>
                <span>
                  {spanFirst}
                  <br />
                  {spanSecond}
                </span>
                <br />
                {defaults}
              </p>
            </S.CardText>
          </S.Card>
        ))}
      </S.FunctionSection>
      <S.FinishSection>
        <span>코넥티들을 위한 도전은 계속됩니다.</span>
        <S.LinkGroup>
          {links.map(({ icon, route }) => (
            <S.GotoLink key={icon} onClick={() => navigate(route)}>
              {IconMap[icon]}
            </S.GotoLink>
          ))}
        </S.LinkGroup>
      </S.FinishSection>
      <S.BottomBox>
        {developers.map(({ name, field, email }) => (
          <S.InformationBox key={name}>
            <p>
              <span>{name}</span> {field} {email}
            </p>
          </S.InformationBox>
        ))}
      </S.BottomBox>
    </S.MainContainer>
  );
}
