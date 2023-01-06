import React from 'react';
import googleLogo from 'assets/images/google-logo.png';
import githubLogo from 'assets/images/github-logo.png';
import { OAUTH_TYPE, OAUTH_URL } from 'constant/route.constant';
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
        <S.Button onClick={() => handleClickSocialLogin(OAUTH_TYPE.GOOGLE)}>
          <Image src={googleLogo} alt="google logo" isAssets />
        </S.Button>
        <S.Button onClick={() => handleClickSocialLogin(OAUTH_TYPE.GITHUB)}>
          <Image src={githubLogo} alt="github logo" isAssets />
        </S.Button>
      </S.Buttons>
    </S.Container>
  );
}
