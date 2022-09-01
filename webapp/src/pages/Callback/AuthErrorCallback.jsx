import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from 'constant/route.constant';

AuthErrorCallback.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default function AuthErrorCallback({ errorMessage }) {
  const naviagte = useNavigate();

  const moveToLogin = () => {
    naviagte(ROUTE.LOGIN);
  };
  return (
    <div>
      <h1>{errorMessage}</h1>
      <button onClick={moveToLogin}>로그인 페이지로 이동하기</button>
    </div>
  );
}
