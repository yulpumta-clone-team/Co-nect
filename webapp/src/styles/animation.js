import { css, keyframes } from 'styled-components/macro';

const skeletionAnimationKeyFrames = keyframes`
   0% {
    transform: translateX(-40%);
  }
  100% {
    transform: translateX(100%);
  }
`;

export const SKELETON_ANIMATION = css`
  &::before {
    content: '';
    position: absolute;
    transform: translateX(-80px);
    height: inherit;
    width: inherit;
    animation: ${skeletionAnimationKeyFrames} 1s infinite;
    z-index: inherit;
    background-image: linear-gradient(
      to left,
      rgba(251, 251, 251, 0.05),
      rgba(251, 251, 251, 0.3),
      rgba(251, 251, 251, 0.6),
      rgba(251, 251, 251, 0.3),
      rgba(251, 251, 251, 0.05)
    );
  }
`;

const animation = {
  SKELETON_ANIMATION,
};

export default animation;
