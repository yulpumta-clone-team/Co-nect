import { ROUTE } from 'constant/route.constant';
import useSetInterval from 'hooks/useSetInterval';
import useSetTimeout from 'hooks/useSetTimeout';
import React, { useState } from 'react';
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
    <div>
      <span>로그인에 실패하였습니다. 다른 로그인 방법을 선택해주세요.</span>
      {count}
    </div>
  );
}
