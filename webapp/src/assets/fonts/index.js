import { css } from 'styled-components/macro';

import NotoSansKR_Bold from './NotoSansKR-Bold.otf';
import NotoSansKR_Regular from './NotoSansKR-Regular.otf';
import AppleSDGothicNeo_Bold from './AppleSDGothicNeoB.ttf';
import AppleSDGothicNeo_Regular from './AppleSDGothicNeoR.ttf';
import OpenSans_Bold from './OpenSans-Bold.ttf';
import OpenSans_Regular from './OpenSans-Regular.ttf';

export default css`
  // 구글 본고딕 - 한글
  @font-face {
    font-family: 'AppleSDGothicNeo';
    src: local('AppleSDGothicNeo'), url(${AppleSDGothicNeo_Bold}) format('truetype');
    font-weight: 700;
  }
  @font-face {
    font-family: 'AppleSDGothicNeo';
    src: local('AppleSDGothicNeo'), url(${AppleSDGothicNeo_Regular}) format('truetype');
    font-weight: 400;
  }
  @font-face {
    font-family: 'Noto Sans KR';
    src: local('Noto Sans KR'), url(${NotoSansKR_Bold}) format('opentype');
    font-weight: 700;
  }
  @font-face {
    font-family: 'Noto Sans KR';
    src: local('Noto Sans KR'), url(${NotoSansKR_Regular}) format('opentype');
    font-weight: 400;
  }

  // 구글 arimo - 영어
  @font-face {
    font-family: 'Open Sans';
    src: local('Open Sans'), url(${OpenSans_Bold}) format('truetype');
    font-weight: 700;
  }
  @font-face {
    font-family: 'Open Sans';
    src: local('Open Sans'), url(${OpenSans_Regular}) format('truetype');
    font-weight: 400;
  }
`;
