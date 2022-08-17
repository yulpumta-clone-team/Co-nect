import React from 'react';
import PropTypes from 'prop-types';

import * as S from './Divider.style';

Divider.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
};

export default function Divider({ width, height, marginTop, marginBottom }) {
  return (
    <S.Container width={width} height={height} marginTop={marginTop} marginBottom={marginBottom} />
  );
}
