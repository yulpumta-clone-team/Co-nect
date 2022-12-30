import styled, { css, keyframes } from 'styled-components/macro';

export const Container = styled.div`
  position: relative;
  width: ${({ isFullPage }) => (isFullPage ? '100vw' : '220px')};
  height: ${({ isFullPage }) => (isFullPage ? '100vh' : '220px')};
  background-color: ${({ isFullPage }) =>
    isFullPage ? 'rgba(255, 255, 255, 0.8)' : 'transparent'};
  ${({ theme: { mixin } }) => mixin.flexCenter({})}
`;

export const MainLogo = css`
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const motion = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const RippleSpinner = styled.div`
  display: inline-block;
  position: relative;
  width: 220px;
  height: 220px;
  div {
    transform-origin: 110px 110px;
    animation: ${motion} 1.2s linear infinite;
  }
  div:after {
    content: '';
    display: block;
    position: absolute;
    top: 100px;
    left: 10px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ theme: { colors } }) => colors.primary.normal};
  }
  div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -1.1s;
  }
  div:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: -1s;
  }
  div:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: -0.9s;
  }
  div:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: -0.8s;
  }
  div:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: -0.7s;
  }
  div:nth-child(6) {
    transform: rotate(150deg);
    animation-delay: -0.6s;
  }
  div:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: -0.5s;
  }
  div:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: -0.4s;
  }
  div:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: -0.3s;
  }
  div:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: -0.2s;
  }
  div:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: -0.1s;
  }
  div:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
  }
`;
