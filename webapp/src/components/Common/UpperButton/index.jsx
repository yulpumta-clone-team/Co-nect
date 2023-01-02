import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import ChevronUpSvg from 'assets/icons/ChevronUpSvg';
import * as S from './UpperButton.style';

UpperButton.propTypes = {
  initShow: PropTypes.bool,
};

export default function UpperButton({ initShow = false }) {
  const [isShow, setIsShow] = useState(initShow);
  const handleScroll = () => {
    const { scrollY } = window;
    if (scrollY > 200) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  };
  const moveToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <S.Container isShow={isShow} onClick={moveToTop}>
      <ChevronUpSvg />
    </S.Container>
  );
}
