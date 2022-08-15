import React from 'react';
import PropTypes from 'prop-types';

import { themePropTypesChecker } from 'utils/customProptypes';
import * as S from './style';

Button.propTypes = {
  children: PropTypes.node.isRequired,
  theme: themePropTypesChecker,
  customStyle: PropTypes.array,
  disabled: PropTypes.bool,
};

export default function Button({ children, theme, customStyle, disabled, ...rest }) {
  return (
    <S.Container mytheme={S.themes[theme]} customStyle={customStyle} {...rest}>
      {children}
    </S.Container>
  );
}