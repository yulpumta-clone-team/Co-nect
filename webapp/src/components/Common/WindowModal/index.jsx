import React from 'react';
import PropTypes from 'prop-types';
import Portal from './Portal';
import * as S from './style';
import Button from '../Button';

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  wrapperId: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.bool.isRequired,
};

export default function Modal({ children, wrapperId, isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <Portal wrapperId={wrapperId} isLock>
      <S.Overlay onClick={onClose}>
        <S.Content onClick={(event) => event.stopPropagation()}>
          <Button theme="primary" onClick={onClose} customStyle={S.CloseButton}>
            &times;
          </Button>
          {children}
        </S.Content>
      </S.Overlay>
    </Portal>
  );
}
