import React from 'react';
import PropTypes from 'prop-types';

import * as S from './Divider.style';

Divider.propTypes = {
  className: PropTypes.string,
  isRow: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
  customStyle: PropTypes.array,
};

export default function Divider({
  className,
  isRow = true,
  width,
  height,
  marginTop,
  marginBottom,
  customStyle,
}) {
  return isRow ? (
    <S.RowContainer
      className={className}
      width={width}
      height={height}
      marginTop={marginTop}
      marginBottom={marginBottom}
      customStyle={customStyle}
    />
  ) : (
    <S.ColContainer
      className={className}
      width={width}
      height={height}
      marginTop={marginTop}
      marginBottom={marginBottom}
      customStyle={customStyle}
    />
  );
}
