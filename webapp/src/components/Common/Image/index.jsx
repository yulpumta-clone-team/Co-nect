import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import MainLogoImage from 'assets/images/main-logo.png';
import { S3IMAGE_URL } from 'utils';
import * as S from './style';

const Image = forwardRef(({ src = null, alt, customStyle, isAssets = false }, ref) => {
  const handleError = (event) => {
    event.target.onerror = null;
    event.target.src = MainLogoImage;
  };
  const imageSrc = isAssets ? src : S3IMAGE_URL(src);
  return (
    <S.Image ref={ref} src={imageSrc} alt={alt} onError={handleError} customStyle={customStyle} />
  );
});

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  customStyle: PropTypes.array,
  isAssets: PropTypes.bool,
};

export default Image;
