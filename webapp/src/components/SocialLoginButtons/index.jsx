import React from 'react';
import PropTypes from 'prop-types';
import googleLogo from 'assets/images/google-logo.png';
import appleLogo from 'assets/images/apple-logo.png';

import * as S from './SocialLoginButtons.style';

SocialLoginButtons.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function SocialLoginButtons({ children }) {
  return (
    <S.Container>
      <span>{children}</span>
      <S.Buttons>
        <S.Button>
          <img src={googleLogo} alt="googleLogo" />
        </S.Button>
        <S.Button>
          <img src={appleLogo} alt="appleLogo" />
        </S.Button>
      </S.Buttons>
    </S.Container>
  );
}
