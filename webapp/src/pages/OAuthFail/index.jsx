import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { ROUTE } from 'constant/route.constant';
import useSetInterval from 'hooks/useSetInterval';
import useSetTimeout from 'hooks/useSetTimeout';
import { useNavigate } from 'react-router-dom';

const COUNT = 5;

export default function OAuthFail() {
  const [count, setCount] = useState(COUNT);
  const navigate = useNavigate();

  const setTimeoutCallback = () => navigate(ROUTE.LOGIN);

  const setUseIntervalCallback = () => setCount((prev) => prev - 1);

  useSetTimeout(setTimeoutCallback, 5000);
  useSetInterval(setUseIntervalCallback, 1000);
  return (
    <S.Container>
      <h1>로그인에 실패하였습니다.😅 </h1>
      <h1>다른 로그인 방법을 선택해주세요.</h1>
      <p>
        {count}
        <span>초 후에 로그인페이지로 이동합니다</span>
      </p>
    </S.Container>
  );
}

const Container = styled.div`
  max-width: 1180px;
  height: 100vh;
  ${({ theme: { mixin } }) => mixin.flexCenter({})}
  gap: 24px;
  h1 {
    ${({ theme: { fonts } }) => fonts.korean.title}
  }
`;
const S = {
  Container,
};
