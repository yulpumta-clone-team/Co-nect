import { DEFAULT_PROFILE_IMG } from 'constant';
import React from 'react';
import PropTypes from 'prop-types';

import * as S from './style';

ProfileImg.propTypes = {
  src: PropTypes.string.isRequired,
};

export default function ProfileImg({ src }) {
  const handleError = (event) => {
    event.target.onerror = null;
    event.target.src = DEFAULT_PROFILE_IMG;
  };
  return <S.ProfileImg src={src} onError={handleError} />;
}
