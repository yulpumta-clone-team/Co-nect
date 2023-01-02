import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from 'constant/route.constant';
import Button from 'components/Common/Button';
import * as S from './callback.style';

AuthErrorCallback.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default function AuthErrorCallback({ errorMessage }) {
  const naviagte = useNavigate();

  const moveToLogin = () => {
    naviagte(ROUTE.LOGIN);
  };
  return (
    <S.Container>
      <h1>{errorMessage}</h1>
      <Button theme="primary" onClick={moveToLogin} customStyle={S.Button}>
        재요청하기
      </Button>
    </S.Container>
  );
}
