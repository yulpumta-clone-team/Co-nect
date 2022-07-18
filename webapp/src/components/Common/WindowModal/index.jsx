import React from 'react';
import PropTypes from 'prop-types';
import Potal from './Potal';
import * as S from './style';

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  wrapperId: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.bool.isRequired,
};

export default function Modal({ children, wrapperId, isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <Potal wrapperId={wrapperId} isLock>
      <S.Overlay onClick={onClose}>
        <S.Content onClick={(event) => event.stopPropagation()}>
          <S.CloseButton onClick={onClose}>&times;</S.CloseButton>
          {children}
        </S.Content>
      </S.Overlay>
    </Potal>
  );
}
