import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  MAIN_SERVICE_FEATURES,
  CARD_TEXTS,
  KOR_TITLE_CONECT,
  MAIN_SERVICE_LINKS,
  MAIN_TEXT,
} from 'constant/main.constant';
import { useNavigate } from 'react-router-dom';
import GlobalNavigation from 'components/GlobalNavigation';
import WithProvider from 'hoc/withProvider';
import ToastNotificationProvider, {
  useToastNotificationAction,
  useToastNotificationState,
} from 'contexts/ToastNotification';
import { deleteMessage } from 'contexts/ToastNotification/action';
import ToastNotification from 'components/ToastNotification';
import { throttle } from 'lodash';
import SimpleListComponent from 'hoc/SimpleListComponent';
import Footer from 'components/Footer';
import * as S from './Main.style';

const IconMap = {
  signUp: <S.SignUp />,
  board: <S.Board />,
  post: <S.Post />,
  cloud: <S.Cloud />,
  ghost: <S.Ghost />,
  earth: <S.Earth />,
  heartPoint: <S.HeartPoint />,
  cellPhone: <S.CellPhone />,
  message: <S.Message />,
};
export default WithProvider({
  Providers: [ToastNotificationProvider],
  Component: Main,
});

function Main() {
  const navigate = useNavigate();
  const { toastList } = useToastNotificationState();
  const notifyDispatch = useToastNotificationAction();
  const deleteToastCallback = (id) => {
    deleteMessage(notifyDispatch, id);
  };

  const ref = useRef(HTMLElement);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const handleScroll = useMemo(
    () =>
      throttle(() => {
        if (typeof window === 'undefined') {
          return;
        }
        if (ref === null || ref.current === null) {
          return;
        }

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
          ref.current.style.top = '-80px';
        } else {
          ref.current.style.top = '0';
        }
        setLastScrollTop(scrollTop);
      }, 1000),
    [lastScrollTop],
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    window.addEventListener('scroll', handleScroll);
  }, [handleScroll]);
  return (
    <S.MainContainer>
      <S.Header ref={ref}>
        <GlobalNavigation />
      </S.Header>
      <S.MainSection>
        <S.Section>
          <S.Wave>
            <SimpleListComponent Component={S.Curve} idx={4} />
          </S.Wave>
          <S.Contents>
            <S.Logo />
            <S.MainText>
              {MAIN_TEXT.split('').map((t, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <S.GhostEffects key={i} index={i}>
                  {t}
                </S.GhostEffects>
              ))}
            </S.MainText>
            <S.SubText>
              <span>코넥트는 사람과 사람의 연결을 의미합니다.</span>
              <br />
              <span>맞잡은 손을 이용해 코넥트가 표현하고자 하는 연결의 의미를 나타내었습니다.</span>
            </S.SubText>
          </S.Contents>
        </S.Section>
        <S.ScrollDown>
          <S.Indicator />
          <S.Indicator />
          <S.Indicator />
        </S.ScrollDown>
      </S.MainSection>
      <S.PurposeSection>
        <S.StartQuestion>
          <S.Image3D>
            <p>
              {KOR_TITLE_CONECT.split('').map((s, i) => (
                <S.MoveText key={s} index={i}>
                  {s}
                </S.MoveText>
              ))}
              는 무엇을 위해 만들어졌을까요?
            </p>
          </S.Image3D>
        </S.StartQuestion>
        <S.Benefit>
          <S.CircleGroup>
            {MAIN_SERVICE_FEATURES.map(({ first, second }) => (
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
        {CARD_TEXTS.map(({ title, description, iconFront, iconBehind }) => (
          <S.Card key={title}>
            {IconMap[iconFront]}
            {IconMap[iconBehind]}
            <S.CardText>
              {title.split('\n').map((w) => (
                <span>{w}</span>
              ))}
              {description.split('\n').map((w) => (
                <p>{w}</p>
              ))}
            </S.CardText>
          </S.Card>
        ))}
      </S.FunctionSection>
      <S.FinishSection>
        <span>코넥티들을 위한 도전은 계속됩니다.</span>
        <S.LinkGroup>
          {MAIN_SERVICE_LINKS.map(({ icon, route }) => (
            <S.GotoLink key={icon} onClick={() => navigate(route)}>
              {IconMap[icon]}
            </S.GotoLink>
          ))}
        </S.LinkGroup>
      </S.FinishSection>
      <Footer />
      <ToastNotification
        toastList={toastList}
        col="top"
        row="right"
        autoDelete
        autoDeleteTime={2000}
        deleteCallback={deleteToastCallback}
      />
    </S.MainContainer>
  );
}
