import React from 'react';
import PropTypes from 'prop-types';

import * as S from './style';

Dropdown.propTypes = {
  children: PropTypes.element.isRequired,
  isDropdownOpen: PropTypes.bool.isRequired,
  customStyle: PropTypes.shape({
    containerStyle: PropTypes.object,
    layoutStyle: PropTypes.object,
    buttonStyle: PropTypes.object,
  }),
};

export default function Dropdown({ children, isDropdownOpen, customStyle }) {
  if (!isDropdownOpen) return null;
  return (
    <S.Container customStyle={customStyle?.containerStyle}>
      <S.Layout onClick={(event) => event.stopPropagation()} customStyle={customStyle?.layoutStyle}>
        {children}
      </S.Layout>
    </S.Container>
  );
}
