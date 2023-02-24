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
  const isMock = src?.substring(0, 5) === 'https'; // mock api로 실행할 때 이미지 보여지게 하는 용도
  const imageSrc = isAssets || isMock ? src : S3IMAGE_URL(src);
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
