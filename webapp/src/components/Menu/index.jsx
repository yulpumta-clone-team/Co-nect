import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { CloseModalButton, CreateMenu, MenuContainer } from './style';

function Menu({ children, style, show, onCloseModal }) {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);
  const handleKeyEsc = useCallback(
    (e) => {
      if (e.keyCode === 27) {
        onCloseModal();
      }
    },
    [onCloseModal],
  );
  if (!show) {
    return null;
  }
  return (
    <CreateMenu onClick={onCloseModal} onKeyDown={handleKeyEsc} tabIndex={0}>
      <MenuContainer onClick={stopPropagation} style={style}>
        <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
        {children}
      </MenuContainer>
    </CreateMenu>
  );
}

Menu.propTypes = {
  children: PropTypes.element.isRequired,
  style: PropTypes.object.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default Menu;
