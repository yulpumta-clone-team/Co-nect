import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import MainLogoIcon from 'assets/icons/conect-main.svg';

import * as S from './style';

const Image = forwardRef(({ src = '', alt, customStyle }, ref) => {
  const handleError = (event) => {
    event.target.onerror = null;
    event.target.src = MainLogoIcon;
  };
  return <S.Image ref={ref} src={src} alt={alt} onError={handleError} customStyle={customStyle} />;
});

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  customStyle: PropTypes.array,
};

export default Image;
