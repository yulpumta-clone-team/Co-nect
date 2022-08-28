import { DEFAULT_PROFILE_IMG } from 'constant';
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import * as S from './style';

const Image = forwardRef(({ src, customStyle }, ref) => {
  const handleError = (event) => {
    event.target.onerror = null;
    event.target.src = DEFAULT_PROFILE_IMG;
  };
  return <S.Image ref={ref} src={src} onError={handleError} customStyle={customStyle} />;
});

Image.propTypes = {
  src: PropTypes.string.isRequired,
  customStyle: PropTypes.array,
};

export default Image;
