import React from 'react';
import PropTypes from 'prop-types';

import * as S from './style';

Dropdown.propTypes = {
  children: PropTypes.element.isRequired,
  isDropdownOpen: PropTypes.bool.isRequired,
  customStyle: PropTypes.shape({
    overlayStyle: PropTypes.array,
    contentStyle: PropTypes.array,
  }),
};

export default function Dropdown({ children, isDropdownOpen, customStyle }) {
  if (!isDropdownOpen) return null;
  return (
    <S.Overlay customStyle={customStyle?.overlayStyle}>
      <S.Content
        onClick={(event) => event.stopPropagation()}
        customStyle={customStyle?.contentStyle}
      >
        {children}
      </S.Content>
    </S.Overlay>
  );
}
