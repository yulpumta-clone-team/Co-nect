import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import * as S from './BackButton.style';

BackButton.propTypes = {
  url: PropTypes.string,
};

export default function BackButton({ url }) {
  const navigate = useNavigate();

  const handleOnClickBack = () => {
    const backUrl = url || -1;
    navigate(backUrl);
  };
  return (
    <S.Container onClick={handleOnClickBack}>
      <S.UpArrow />
    </S.Container>
  );
}
