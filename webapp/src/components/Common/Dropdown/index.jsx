import React from 'react';
import PropTypes from 'prop-types';

import * as S from './style';

Dropdown.propTypes = {
  children: PropTypes.element.isRequired,
  isDropdownOpen: PropTypes.bool.isRequired,
  shouldCloseDropdown: PropTypes.func.isRequired,
  closeDropdown: PropTypes.func.isRequired,
  customLayoutStyle: PropTypes.object,
  customCloseButtonStyle: PropTypes.object,
};

export default function Dropdown({
  children,
  isDropdownOpen,
  shouldCloseDropdown,
  closeDropdown,
  customLayoutStyle,
  customCloseButtonStyle,
}) {
  if (!isDropdownOpen) return null;
  return (
    <S.Container>
      <S.Layout>{children}</S.Layout>
    </S.Container>
  );
}
