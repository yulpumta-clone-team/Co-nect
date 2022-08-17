import { css } from 'styled-components';
import mixin from './mixin';

export const FONT = {
  FAMILY: {
    KOREAN: "'AppleSDGothicNeo', 'Noto Sans KR', sans-serif",
    ENGLISH: "'Open Sans', sans-serif",
  },
  STYLE: {
    BASE: 'normal',
    ITALIC: 'italic',
  },
  WEIGHT: {
    REGULAR: '400',
    BOLD: '700',
  },
  SIZE: {
    // html {font-size: 10px}
    BASE: '1.6rem',
    MEDIUM: '2.4rem',
    LARGE: '3.6rem',
    X_LARGE: '4rem',
  },
  HEIGHT: {
    // html {line-height: 10px}
    BASE: '1.6rem',
    MEDIUM: '2.4rem',
    LARGE: '3.2rem',
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
    fff: '#ffffff',
    200: '#979797',
    400: '#DEDEDE',
    500: '#c2c2c2',
    600: '#979797',
    700: '#818181',
    800: '#606060',
    1000: '#000000',
  },
};

const fonts = {
  korean: {
    title: css`
      font-family: ${FONT.FAMILY.KOREAN};
      font-style: ${FONT.STYLE.BASE};
      font-weight: ${FONT.WEIGHT.BOLD};
      font-size: ${FONT.SIZE.X_LARGE};
      line-height: ${FONT.HEIGHT.LARGE};
    `,
    subTitle: css`
      font-family: ${FONT.FAMILY.KOREAN};
      font-style: ${FONT.STYLE.BASE};
      font-weight: ${FONT.WEIGHT.REGULAR};
      font-size: ${FONT.SIZE.MEDIUM};
      line-height: ${FONT.HEIGHT.LARGE};
    `,
    emphasis: css`
      font-family: ${FONT.FAMILY.KOREAN};
      font-style: ${FONT.STYLE.BASE};
      font-weight: ${FONT.WEIGHT.REGULAR};
      font-size: ${FONT.SIZE.BASE};
      line-height: ${FONT.HEIGHT.MEDIUM};
    `,
    default: css`
      font-family: ${FONT.FAMILY.KOREAN};
      font-style: ${FONT.STYLE.BASE};
      font-weight: ${FONT.WEIGHT.REGULAR};
      font-size: ${FONT.SIZE.BASE};
      line-height: ${FONT.HEIGHT.MEDIUM};
    `,
  },
  english: {
    title: css`
      font-family: ${FONT.FAMILY.ENGLISH};
      font-style: ${FONT.STYLE.BASE};
      font-weight: ${FONT.WEIGHT.BOLD};
      font-size: ${FONT.SIZE.MEDIUM};
      line-height: ${FONT.HEIGHT.LARGE};
    `,
    emphasis: css`
      font-family: ${FONT.FAMILY.ENGLISH};
      font-style: ${FONT.STYLE.BASE};
      font-weight: ${FONT.WEIGHT.BOLD};
      font-size: ${FONT.SIZE.BASE};
      line-height: ${FONT.HEIGHT.MEDIUM};
    `,
    default: css`
      font-family: ${FONT.FAMILY.ENGLISH};
      font-style: ${FONT.STYLE.BASE};
      font-weight: ${FONT.WEIGHT.REGULAR};
      font-size: ${FONT.SIZE.BASE};
      line-height: ${FONT.HEIGHT.MEDIUM};
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
    white: COLORS.GRAY.fff,
    normal: COLORS.GRAY[1000],
    assistant: COLORS.GRAY[800],
    subTitle: COLORS.GRAY[700],
    guide: COLORS.GRAY[600],
    pressed: COLORS.GRAY[600],
    border: COLORS.GRAY[500],
    nonActive: COLORS.GRAY[400],
    hover: COLORS.GRAY[200],
  },
};

// export const zIndex = {
//   gnbLevel: 500,
// };

const deviceSizes = {
  mobile: '375px',
  tablet: '768px',
  pc: '1024px',
};

export const device = {
  mobile: `screen and (max-width: ${deviceSizes.mobile})`,
  tablet: `screen and (max-width: ${deviceSizes.tablet})`,
  pc: `screen and (max-width: ${deviceSizes.pc})`,
};

const theme = { fonts, colors, device, mixin };

export default theme;
