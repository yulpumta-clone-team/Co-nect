import { css } from 'styled-components';

export const FONT = {
  SIZE: {
    // html {font-size: 10px}
    X_SMALL: '1.2rem',
    SMALL: '1.4rem',
    BASE: '1.6rem',
    MEDIUM: '1.8rem',
    LARGE: '3.2rem',
    X_LARGE: '5.6rem',
  },
  WEIGHT: {
    REGULAR: '400',
    MEDIUM: '500',
    BOLD: '700',
  },
  FAMILY: {
    BASE: "'Noto Sans KR', sans-serif",
    LOGO: "'Montserrat', sans-serif",
  },
  STYLE: {
    BASE: 'normal',
    ITALIC: 'italic',
  },
};

const COLORS = {
  BLUE: {
    900: '#036EFF',
    700: '#81B7FF',
  },
  YELLOW: {
    900: '#FFBC39',
    200: '#FFDE9C',
  },
  RED: {
    600: '#ED3049',
    400: '#F54F62',
    200: '#F09AA4',
  },
  GRAY: {
    200: '#979797',
    400: '#DEDEDE',
    600: '#979797',
    800: '#606060',
    1000: '#000000',
  },
};

const fonts = {
  head: {
    large: css`
      font-style: normal;
      font-weight: ${FONT.WEIGHT.REGULAR};
      font-size: 40px;
      line-height: 60px;
    `,
    normal: css`
      font-style: normal;
      font-weight: 400;
      font-size: 32px;
      line-height: 48px;
    `,
    small: css`
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 36px;
    `,
  },
};

const colors = {
  primary: {
    normal: COLORS.BLUE[900],
    light: COLORS.BLUE[700],
  },
  secondary: {
    normal: COLORS.YELLOW[900],
    light: COLORS.YELLOW[200],
  },
  important: {
    normal: COLORS.RED[400],
    light: COLORS.RED[200],
    dark: COLORS.RED[600],
  },
  greyScale: {
    normal: COLORS.GRAY[1000],
    assistant: COLORS.GRAY[800],
    guide: COLORS.GRAY[600],
    pressed: COLORS.GRAY[600],
    nonActive: COLORS.GRAY[400],
    hover: COLORS.GRAY[200],
  },
};

const theme = { fonts, colors };

export default theme;
