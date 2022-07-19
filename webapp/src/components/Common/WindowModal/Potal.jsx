import PropTypes from 'prop-types';
import { useEffect, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

Potal.propTypes = {
  children: PropTypes.element.isRequired,
  wrapperId: PropTypes.string.isRequired,
  isLock: PropTypes.bool.isRequired,
};

export default function Potal({ children, wrapperId, isLock }) {
  const [potalWrapper, setPotalWrapper] = useState(null);

  useEffect(() => {
    if (isLock) {
      lockWindowScroll();
    }

    return unLockWindowScroll();
  }, [isLock]);

  useLayoutEffect(() => {
    const { isCreated, wrapper } = getRootElementById(wrapperId);
    setPotalWrapper(wrapper);
    return () => {
      if (isCreated) {
        removeElement(wrapper);
      }
    };
  }, [wrapperId]);

  if (!potalWrapper) return null;

  return createPortal(children, potalWrapper);
}

const lockWindowScroll = () => {
  document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
};

const unLockWindowScroll = () => {
  const scrollY = document.body.style.top;
  document.body.style.cssText = `position: "";  top: "";`;
  window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
};

const removeElement = (wrapper) => {
  wrapper.parentNode?.removeChild(wrapper);
};

const getRootElementById = (documentId) => {
  let wrapper = document.getElementById(documentId);
  let isCreated = false;
  if (!wrapper) {
    wrapper = createWrapperAndAppendToBody(documentId);
    isCreated = true;
  }
  return { isCreated, wrapper };
};

const createWrapperAndAppendToBody = (wrapperId) => {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};
