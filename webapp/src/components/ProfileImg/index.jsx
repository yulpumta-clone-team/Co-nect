import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import DefaultProfileImage from 'assets/images/default-profile.png';

import * as S from './style';

const ProfileImg = forwardRef(({ src, alt, customStyle }, ref) => {
  const handleError = (event) => {
    event.target.onerror = null;
    event.target.src = DefaultProfileImage;
  };
  const defaultSrc = src || DefaultProfileImage;
  return (
    <S.ProfileImg
      ref={ref}
      src={defaultSrc}
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
};

export default ProfileImg;
