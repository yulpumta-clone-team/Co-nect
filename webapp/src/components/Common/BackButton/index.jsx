import React from 'react';

import { useNavigate } from 'react-router-dom';
import * as S from './BackButton.style';

export default function BackButton(props) {
  const navigate = useNavigate();

  const handleOnClickBack = () => {
    navigate(-1);
  };
  return (
    <S.Container onClick={handleOnClickBack}>
      <S.UpArrow />
    </S.Container>
  );
}
