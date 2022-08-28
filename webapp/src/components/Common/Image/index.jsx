import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import MainLogoIcon from 'assets/icons/conect-main.svg';

import * as S from './style';

const Image = forwardRef(({ src, customStyle }, ref) => {
  const handleError = (event) => {
    event.target.onerror = null;
    event.target.src = MainLogoIcon;
  };
  return <S.Image ref={ref} src={src} onError={handleError} customStyle={customStyle} />;
});

Image.propTypes = {
  src: PropTypes.string.isRequired,
  customStyle: PropTypes.array,
};

export default Image;
