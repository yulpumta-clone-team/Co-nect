import { css } from 'styled-components';

import NotoSansKR_Bold from './NotoSansKR-Bold.otf';
import NotoSansKR_Regular from './NotoSansKR-Regular.otf';
import Arimo_Bold from './Arimo-Bold.ttf';
import Arimo_Regular from './Arimo-Regular.ttf';

export default css`
  // 구글 본고딕 - 한글
  @font-face {
    font-family: 'NotoSansKR';
    src: local('NotoSansKR'), url(${NotoSansKR_Regular}) format('woff');
    font-weight: 400;
  }
  @font-face {
    font-family: 'NotoSansKR';
    src: local('NotoSansKR'), url(${NotoSansKR_Bold}) format('woff');
    font-weight: 700;
  }
  // 구글 arimo - 영어
  @font-face {
    font-family: 'Arimo';
    src: local('Arimo'), url(${Arimo_Regular}) format('woff');
    font-weight: 400;
  }
  @font-face {
    font-family: 'Arimo';
    src: local('Arimo'), url(${Arimo_Bold}) format('woff');
    font-weight: 700;
  }
`;
