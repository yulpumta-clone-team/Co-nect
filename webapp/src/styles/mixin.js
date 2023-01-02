import { css } from 'styled-components/macro';

const mixin = {
  // flex
  flexBox: ({ direction = 'row', align, justify }) => css`
    display: flex;
    flex-direction: ${direction};
    align-items: ${align};
    justify-content: ${justify};
  `,
  inlineFlexBox: ({ direction = 'row', align, justify }) => css`
    display: inline-flex;
    flex-direction: ${direction};
    align-items: ${align};
    justify-content: ${justify};
  `,
  flexCenter: ({ direction = 'column' }) => css`
    display: flex;
    flex-direction: ${direction};
    align-items: center;
    justify-content: center;
  `,

  // positions
  positionCenterX: (position = 'absolute') => css`
    position: ${position};
    left: 50%;
    transform: translateX(-50%);
  `,

  positionCenterY: (type = 'absolute') => css`
    position: ${type};
    top: 50%;
    transform: translateY(-50%);
  `,

  positionCenter: (type = 'absolute') => css`
    position: ${type};
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  `,

  visuallyHidden: () => css`
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  `,
  handlePlaceHolderColor: ({ color, fonts }) => css`
    &::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: ${color};
      opacity: 1; /* Firefox */
      ${fonts}
    }

    &:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: ${color};
      ${fonts}
    }

    &::-ms-input-placeholder {
      /* Microsoft Edge */
      color: ${color};
      ${fonts}
    }
  `,
};

export default mixin;
