import React from 'react';
import styled, { css } from 'styled-components/macro';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Common/Button';

export default function NotFound() {
  const navigate = useNavigate();
  const backToMain = () => {
    navigate('/');
  };
  return (
    <S.Container>
      <h1>NotFound</h1>
      <Button theme="primary" onClick={backToMain} customStyle={S.SButton}>
        홈으로 돌아가기
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
  width: 200px;
  height: 35px;
`;

const S = {
  Container,
  SButton,
};
