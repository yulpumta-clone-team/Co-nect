import React from 'react';
import PropTypes from 'prop-types';

import * as S from './BackButton.style';

BackButton.propTypes = {};

export default function BackButton(props) {
  return (
    <S.Container>
      <S.UpArrow />
    </S.Container>
  );
}
