import React from 'react';
import googleLogo from 'assets/images/google-logo.png';
import githubLogo from 'assets/images/github-logo.png';
import { OAUTH_URL } from 'constant/route.constant';
import Image from 'components/Common/Image';
import * as S from './SocialLoginButtons.style';

export default function SocialLoginButtons() {
  const handleClickSocialLogin = (type) => {
    window.location.href = OAUTH_URL[type];
  };
  return (
    <S.Container>
      <span>소셜계정으로 로그인</span>
      <S.Buttons>
        <S.Button onClick={() => handleClickSocialLogin('GOOGLE')}>
          <Image src={googleLogo} alt="googleLogo" />
        </S.Button>
        <S.Button onClick={() => handleClickSocialLogin('GITHUB')}>
          <Image src={githubLogo} alt="github logo" />
        </S.Button>
      </S.Buttons>
    </S.Container>
  );
}
