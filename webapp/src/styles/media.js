import { css, CSSObject, SimpleInterpolation } from 'styled-components';

/**
 * media쿼리를 적용할 타입
 * @typedef DeviceType
 * @property {type} "desktop" | "tablet" | "mobile"
 */

/**
 * @type {DeviceType} media쿼리를 적용할 타입 (desktop | tablet | mobile)
 */
const sizes = {
  // desktop: 1024,
  tablet: 1023,
  mobile: 767,
};

const mediaCSS = Object.entries(sizes).reduce(
  (acc, [key, value]) => ({
    ...acc,
    [key]: (props) => css`
      @media (max-width: ${value}px) {
        ${props}
      }
    `,
  }),
  {},
);

export default mediaCSS;
