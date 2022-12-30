import React, { useEffect } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import useHandleLogin from 'hooks/useHandleLogin';
import Spinner from 'components/Common/Loader/Spinner';

export default function OAuthCallback() {
  const { search } = useLocation();
  const { accessToken, refreshToken, isFirst } = queryString.parse(search);
  const { handleLogin } = useHandleLogin();
  const isFirstLogin = isFirst !== 'false';

  useEffect(() => {
    handleLogin({ accessToken, refreshToken, isFirstLogin });
  }, []);

  return <Spinner withLogo isFullPage />;
}
