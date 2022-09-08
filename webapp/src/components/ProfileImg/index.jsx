import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import MainLogoIcon from 'assets/icons/conect-main.svg';

import * as S from './style';

const ProfileImg = forwardRef(({ src }, ref) => {
  const handleError = (event) => {
    event.target.onerror = null;
    event.target.src = MainLogoIcon;
  };
  return <S.ProfileImg ref={ref} src={src} onError={handleError} />;
});

ProfileImg.propTypes = {
  src: PropTypes.string.isRequired,
};

export default ProfileImg;
