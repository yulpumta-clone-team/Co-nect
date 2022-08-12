import React from 'react';
import PropTypes from 'prop-types';

import * as S from './style';

Divider.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

export default function Divider({ width, height }) {
  return <S.Container width={width} height={height} />;
}
