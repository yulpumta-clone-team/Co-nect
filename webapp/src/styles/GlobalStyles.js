import fonts from 'assets/fonts';
import { createGlobalStyle } from 'styled-components/macro';

import Normalize from './Normalize';

const GlobalStyles = createGlobalStyle`
${Normalize}
${fonts}
* {
  font-family: "AppleSDGothicNeo", 'Noto Sans KR', sans-serif;
  box-sizing: border-box;
  margin: 0;
}
html {
   font-size: 10px; // rem 단위를 편하게 사용하기 위해 10px로 함.
   line-height: 10px;
}
  body {
    width: 100%;
    font: inherit;
    letter-spacing: -0.4px;
    font-size: 1.6rem;
  }
button,
input,
select,
textarea {
  background-color: transparent;
  border: 0;
  padding: 0;
  margin: 0;
  &:focus {
    outline: none;
    box-shadow: none;
  }
}
a,
button {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
}
ul, li {
  padding: 0;
  list-style: none;
}
`;

export default GlobalStyles;
