import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import DefaultProfileImage from 'assets/images/default-profile.png';

import * as S from './style';

const ProfileImg = forwardRef(({ src }, ref) => {
  const handleError = (event) => {
    event.target.onerror = null;
    event.target.src = DefaultProfileImage;
  };
  return <S.ProfileImg ref={ref} src={src} onError={handleError} />;
});

ProfileImg.propTypes = {
  src: PropTypes.string.isRequired,
};

export default ProfileImg;
