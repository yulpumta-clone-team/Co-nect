import React from 'react';
import PropTypes from 'prop-types';
import MainLogoImage from 'assets/images/main-logo.png';
import Image from 'components/Common/Image';
import * as S from './Spinner.style';

Spinner.propTypes = {
  withLogo: PropTypes.bool,
  isFullPage: PropTypes.bool,
};

export default function Spinner({ withLogo = false, isFullPage = false }) {
  return (
    <S.Container isFullPage={isFullPage}>
      {withLogo && <Image alt="main logo" src={MainLogoImage} customStyle={S.MainLogo} />}
      <S.RippleSpinner>
        {Array(12)
          .fill(0)
          .map((_, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={idx} />
          ))}
      </S.RippleSpinner>
    </S.Container>
  );
}
