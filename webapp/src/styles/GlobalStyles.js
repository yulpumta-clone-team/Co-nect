import { createGlobalStyle } from 'styled-components';

import Normalize from './Normalize';

const GlobalStyles = createGlobalStyle`
${Normalize}
* {
  
  box-sizing: border-box;
  margin: 0;
}
html {
   
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
