import { DEFAULT_PROFILE_IMG } from 'constant';
import React from 'react';
import PropTypes from 'prop-types';

import * as S from './style';

Image.propTypes = {
  src: PropTypes.string.isRequired,
  customStyle: PropTypes.array,
};

export default function Image({ src, customStyle }) {
  const handleError = (event) => {
    event.target.onerror = null;
    event.target.src = DEFAULT_PROFILE_IMG;
  };
  return <S.Image src={src} onError={handleError} customStyle={customStyle} />;
}
