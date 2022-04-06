import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Potal from 'components/Potal';
import { resetError } from '_actions/global_action';
import { ModalWrapper, ModalContainer, CloseModalButton } from './style';

function WindowModal({ children, show }) {
  const dispatch = useDispatch();
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);
  const onCloseModal = useCallback(() => {
    dispatch(resetError());
  }, [dispatch]);
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
    <Potal>
      <ModalWrapper onClick={onCloseModal} onKeyDown={handleKeyEsc} tabIndex={0}>
        <ModalContainer onClick={stopPropagation}>
          <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
          {children}
        </ModalContainer>
      </ModalWrapper>
    </Potal>
  );
}

WindowModal.propTypes = {
  children: PropTypes.element.isRequired,
  show: PropTypes.bool.isRequired,
};

export default WindowModal;
