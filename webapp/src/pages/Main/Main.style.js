import styled, { keyframes } from 'styled-components/macro';
import MainLogo from 'assets/images/conect-mainpage.png';
import BackGround2 from 'assets/images/section2-bg.png';
import GhostIcon from 'assets/images/ghost.png';
import CloudIcon from 'assets/images/cloud.png';
import EarthIcon from 'assets/images/earth.png';
import HeartIcon from 'assets/images/dating-place.png';
import CellPhoneIcon from 'assets/images/screen-image.png';
import MessageIcon from 'assets/images/feedback-message.png';
import SignUpIcon from 'assets/images/signup-link.png';
import BoardIcon from 'assets/images/board-link.png';
import PostIcon from 'assets/images/post-link.png';

export const MainContainer = styled.div`
  width: 100vw;
`;

export const Header = styled.header`
  position: fixed;
  z-index: 2;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.5s;
  position: fixed;
`;

export const MainSection = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;
`;

export const Section = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Wave = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  top: -180%;
  background-color: #000;
`;

export const animateGradation = keyframes`
  0% {
    transform: translate(-50%, -75%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -75%) rotate(360deg);
  }
`;

export const Curve = styled.div`
  position: absolute;
  width: 750vh;
  height: 725vh;
  left: 50%;
  background: #9d68fe;
  transform: translate(-50%, -75%);
  &:nth-child(1) {
    animation: ${animateGradation} 10s linear infinite;
    border-radius: 44.5%;
    background: #e2e7fd;
    opacity: 80%;
  }
  &:nth-child(2) {
    animation: ${animateGradation} 14s linear infinite;
    border-radius: 45%;
    background: #3a0c8e;
    opacity: 90%;
  }
  &:nth-child(3) {
    top: -10%;
    animation: ${animateGradation} 20s linear infinite;
    border-radius: 43%;
    background: #53d3f4;

    opacity: 90%;
  }
  &:nth-child(4) {
    top: -13%;
    animation: ${animateGradation} 23s linear infinite;
    border-radius: 42.5%;
    background: #9d68fe;

    opacity: 98%;
  }
`;

export const Contents = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  letter-spacing: 0.01em;
`;

export const Logo = styled.img.attrs({ src: `${MainLogo}` })`
  position: relative;
  display: flex;
  top: -30px;
  width: 100px;
  height: 100px;
`;

export const GhostEffects = styled.span`
  transition: 1s;
  &:nth-child(${(props) => props.index + 1}) {
    transition-delay: ${(props) => props.index * 0.1}s;
  }
`;

export const MainText = styled.h2`
  position: relative;
  text-transform: uppercase;
  display: flex;
  text-align: center;
  color: ${({ theme: { colors } }) => colors.greyScale.white};
  font-weight: 800;
  ${({ theme: { fonts } }) => fonts.english.main};
  white-space: pre;
  &:hover {
    ${GhostEffects} {
      filter: blur(20px);
      opacity: 0;
      transform: scale(2);
    }
  }
`;
export const SubText = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: white;
  ${({ theme: { fonts } }) => fonts.main.default_noBold};
`;

export const ScrollDown = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  width: 40px;
  height: 40px;
  transform: translateY(-80px) translateX(-50%) rotate(45deg);
`;

export const animateScroll = keyframes`
  0% {
    top: -5px;
    left: -5px;
    opacity: 0;
  } 
  25% {
    top: 0;
    left: 0;
    opacity: 1;
  }
  50%, 100% {
    top: 5px;
    left: 5px;
    opacity: 0;
  }
`;

export const Indicator = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  border-bottom: 2px solid white;
  border-right: 2px solid white;
  animation: ${animateScroll} 1.5s linear infinite;
  opacity: 0;
  &:nth-child(1) {
    transform: translate(-15px, -15px);
    animation-delay: -0.4s;
  }
  &:nth-child(2) {
    transform: translate(0, 0);
    animation-delay: -0.2s;
  }
  &:nth-child(3) {
    transform: translate(15px, 15px);
    animation-delay: 0s;
  }
`;

export const PurposeSection = styled.div`
  height: 260vh;
  width: 100%;
  background-color: #262c41;
`;
export const StartQuestion = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  ${({ theme: { fonts } }) => fonts.korean.main};
  color: ${({ theme: { colors } }) => colors.greyScale.white};
  & span {
    color: ${({ theme: { colors } }) => colors.primary.normal};
  }
`;
export const Image3D = styled.div`
  background-image: url(${BackGround2});
  background-size: 100% 100%;
  position: relative;
  display: flex;
  justify-content: center;
  height: 100vh;
  ${({ theme: { fonts } }) => fonts.main.title};
  & p {
    position: absolute;
    display: flex;
    justify-content: center;
    width: 1180px;
    top: 25%;
  }
  & span {
    color: ${({ theme: { colors } }) => colors.primary.normal};
  }
`;
export const animateTextMoving = keyframes`
    0%, 40%, 100% 
    {
        transform: translateY(0);
    }
    20% {
      transform: translateY(-50px);
    }
`;
export const animatePulse = keyframes`
   0% {
    transform:scale(1);
  }
  25% {
    transform:scale(0.9);
  }
  50% {
    transform:scale(1);
  }
  75% {
    transform:scale(0.9);
  }
  100% {
    transform:scale(1);
  }
`;

export const MoveText = styled.span`
  position: relative;
  text-transform: uppercase;
  display: inline-block;
  animation: ${animateTextMoving} 2s ease-in-out infinite;
  animation-delay: ${(props) => `${props.delay * 0.1}s`};
`;

export const Benefit = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
  background-color: #262c41;
`;

export const CircleGroup = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Circle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 370px;
  height: 370px;
  border-radius: 50%;
  background-color: ${({ theme: { colors } }) => colors.greyScale.white};

  ${({ theme: { fonts } }) => fonts.main.emphasis};
  animation: ${animatePulse} 2s linear infinite;
  &::before {
    content: '';
    position: absolute;
    top: -99px;
    width: 370px;
    height: 270px;
  }
  &::after {
    content: '';
    position: absolute;
    left: -99px;
    width: 270px;
    height: 370px;
  }
`;

export const Subject = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
  gap: 10%;
  background-color: #262c41;
`;

export const TextFirstLine = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 1180px;
  ${({ theme: { fonts } }) => fonts.korean.title};
  color: ${({ theme: { colors } }) => colors.greyScale.white};
  & span {
    color: ${({ theme: { colors } }) => colors.primary.normal};
  }
`;

export const TextSecondLine = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 1180px;
  ${({ theme: { fonts } }) => fonts.korean.title};
  color: ${({ theme: { colors } }) => colors.greyScale.white};
  & span {
    color: ${({ theme: { colors } }) => colors.primary.normal};
  }
`;

export const FunctionSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 300vh;
  background-color: black;
`;

export const Card = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  height: 450px;
  background-color: black;
  border-radius: 2%;

  overflow: hidden;
  box-sizing: border-box;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: calc(-100% + 4px);
    width: 100%;
    height: 100%;
    background-color: black;
    transition: 0.5s ease-in-out;
  }

  &:hover::before {
    bottom: 0;
  }
  &:nth-child(1)::before {
    background-color: #414141;
  }
  &:nth-child(2)::before {
    background-color: #414141;
  }
  &:nth-child(3)::before {
    background-color: #414141;
  }
`;
export const CardText = styled.div`
  position: absolute;
  color: white;
  width: 55%;
  height: 50%;
  left: 40%;
  top: 25%;

  > span {
    display: block;
    ${({ theme: { fonts } }) => fonts.main.subTitle};
  }

  > p {
    ${({ theme: { fonts } }) => fonts.main.default};
  }

  > p:nth-of-type(1) {
    display: block;
    margin-top: 22px;
  }
`;

export const Ghost = styled.img.attrs({ src: `${GhostIcon}` })`
  position: absolute;
  display: flex;
  left: 10%;
  width: 300px;
  height: 300px;
`;
export const Cloud = styled.img.attrs({ src: `${CloudIcon}` })`
  position: absolute;
  display: flex;
  top: 8%;
  width: 300px;
  height: 300px;
`;
export const Earth = styled.img.attrs({ src: `${EarthIcon}` })`
  position: absolute;
  display: flex;
  left: 10%;
  width: 240px;
  height: 300px;
`;
export const HeartPoint = styled.img.attrs({ src: `${HeartIcon}` })`
  position: absolute;
  display: flex;
  left: 4%;
  top: 10%;
  width: 183px;
  height: 188px;
`;
export const CellPhone = styled.img.attrs({ src: `${CellPhoneIcon}` })`
  position: absolute;
  display: flex;
  left: 14%;
  width: 170px;
  height: 300px;
`;
export const Message = styled.img.attrs({ src: `${MessageIcon}` })`
  position: absolute;
  display: flex;
  left: 5%;
  top: 25%;
  width: 170px;
  height: 170px;
`;

export const FinishSection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #434343;
  color: white;
  ${({ theme: { fonts } }) => fonts.korean.title};
  & span {
    position: absolute;
    display: flex;
    width: 1180px;
    justify-content: center;
    height: 20%;
    top: 20%;
  }
`;
export const LinkGroup = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-around;
  top: 45%;
  width: 80%;
`;
export const SignUp = styled.img.attrs({ src: `${SignUpIcon}` })`
  width: 250px;
  height: 270px;
`;
export const Board = styled.img.attrs({ src: `${BoardIcon}` })`
  width: 250px;
  height: 270px;
`;
export const Post = styled.img.attrs({ src: `${PostIcon}` })`
  width: 250px;
  height: 270px;
`;
export const GotoLink = styled.div`
  position: relative;
  display: flex;
  cursor: pointer;
`;
