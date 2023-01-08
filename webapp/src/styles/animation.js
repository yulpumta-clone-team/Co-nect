import { css, keyframes } from 'styled-components/macro';

const skeletonAnimationKeyFrames = keyframes`
   0% {
    transform: translateX(-40%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const skeletonAnimation = css`
  &::before {
    content: '';
    position: absolute;
    transform: translateX(-80px);
    height: inherit;
    width: inherit;
    animation: ${skeletonAnimationKeyFrames} 1s infinite;
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
  skeletonAnimation,
};

export default animation;
