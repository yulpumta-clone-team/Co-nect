import React, { useEffect } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import useAuthService from 'hooks/useAuthService';
import Spinner from 'components/Common/Loader/Spinner';

export default function OAuthCallback() {
  const { search } = useLocation();
  const { accessToken, refreshToken, isFirst } = queryString.parse(search);
  const { saveJwtToken, checkIsFirstLogin } = useAuthService();
  const isFirstLogin = isFirst !== 'false';

  useEffect(() => {
    saveJwtToken({ accessToken, refreshToken });
    checkIsFirstLogin(isFirstLogin);
  }, []);

  return <Spinner withLogo isFullPage />;
}
