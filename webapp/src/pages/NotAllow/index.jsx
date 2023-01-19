import React from 'react';
import styled, { css } from 'styled-components/macro';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Common/Button';
import { ROUTE } from 'constant/route.constant';

NotAllow.propTypes = {
  warnMessage: PropTypes.string.isRequired,
};

export default function NotAllow({ warnMessage }) {
  const navigate = useNavigate();
  const backToMain = () => {
    navigate(ROUTE.HOME);
  };
  return (
    <S.Container>
      <h1>NotAllow</h1>
      <h3>{warnMessage}</h3>
      <Button theme="primary" onClick={backToMain} customStyle={S.SButton}>
        메인 페이지로 이동하기
      </Button>
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
  h3 {
    ${({ theme: { fonts } }) => fonts.korean.emphasis}
  }
`;

const SButton = css`
  width: 300px;
  height: 35px;
`;

const S = {
  Container,
  SButton,
};
