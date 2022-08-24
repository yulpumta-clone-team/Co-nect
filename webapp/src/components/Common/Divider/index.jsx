import React from 'react';
import PropTypes from 'prop-types';

import * as S from './Divider.style';

Divider.propTypes = {
  isRow: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
  customStyle: PropTypes.array,
};

export default function Divider({
  isRow = true,
  width,
  height,
  marginTop,
  marginBottom,
  customStyle,
}) {
  return isRow ? (
    <S.RowContainer
      width={width}
      height={height}
      marginTop={marginTop}
      marginBottom={marginBottom}
      customStyle={customStyle}
    />
  ) : (
    <S.ColContainer
      width={width}
      height={height}
      marginTop={marginTop}
      marginBottom={marginBottom}
      customStyle={customStyle}
    />
  );
}
