import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import DefaultProfileImage from 'assets/images/default-profile.png';
import { S3IMAGE_URL } from 'utils';
import * as S from './ProfileImg.style';

const ProfileImg = forwardRef(({ src, alt, customStyle, isAssets = false }, ref) => {
  const handleError = (event) => {
    event.target.onerror = null;
    event.target.src = DefaultProfileImage;
  };
  const isMock = src.substring(0, 5) === 'https'; // mock api로 실행할 때 이미지 보여지게 하는 용도
  const imageSrc = isAssets || isMock ? src : S3IMAGE_URL(src);
  return (
    <S.ProfileImg
      ref={ref}
      src={imageSrc}
      alt={alt}
      customStyle={customStyle}
      onError={handleError}
    />
  );
});

ProfileImg.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  customStyle: PropTypes.array,
  isAssets: PropTypes.bool,
};

export default ProfileImg;
