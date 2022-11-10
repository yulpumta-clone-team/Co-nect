import React, { useEffect } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import useHandleLogin from 'hooks/useHandleLogin';

export default function OAuthCallback({}) {
  const { search } = useLocation();
  const { accessToken, refreshToken, isFirst: isFirstLogin } = queryString.parse(search);
  const { handleLogin } = useHandleLogin();

  useEffect(() => {
    handleLogin({ accessToken, refreshToken, isFirstLogin });
  }, []);

  return <div>임시</div>;
}
