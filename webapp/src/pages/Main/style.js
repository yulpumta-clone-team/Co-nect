import styled from 'styled-components';
import Gradient from 'assets/images/main-gradient.png';
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

// ========================================= MainContainer
export const MainContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding-top: 24px;
`;

// ========================================= Section1
export const Section1 = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 120vh;
  background-color: black;
`;
export const MainGradient = styled.div`
  background-image: url(${Gradient});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
export const Logo = styled.img.attrs({ src: `${MainLogo}` })`
  position: absolute;
  display: flex;
  top: 90px;
  width: 100px;
  height: 100px;
`;
export const MainText = styled.div`
  position: relative;
  letter-spacing: 0.01em;
  width: 100%;
  height: 15%;
  left: 30%;
  color: ${({ theme: { colors } }) => colors.greyScale.white};

  font-weight: 800;
  ${({ theme: { fonts } }) => fonts.english.main};
`;
export const SubText = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 15%;
  gap: 20%;
  color: white;
  ${({ theme: { fonts } }) => fonts.main.default2};
`;

// ========================================= Section2
export const Section2 = styled.div`
  position: absolute;
  width: 100%;
  top: 100%;
  background-color: #262c41;
  ${({ theme: { fonts } }) => fonts.korean.main};
  color: ${({ theme: { colors } }) => colors.greyScale.white};
  & span {
    color: ${({ theme: { colors } }) => colors.primary.normal};
  }
`;
export const Section2BG = styled.div`
  background-image: url(${BackGround2});
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  ${({ theme: { fonts } }) => fonts.main.title};
  & span {
    top: 1000px;
    color: ${({ theme: { colors } }) => colors.primary.normal};
  }
`;

// ========================================= Section3

export const Section3 = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #262c41;
  top: 200%;
`;
export const CircleGroup = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 80%;
`;
export const section3Circle1 = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 330px;
  height: 330px;
  border-radius: 50%;
  top: -120px;
  background-color: ${({ theme: { colors } }) => colors.greyScale.white};
  ${({ theme: { fonts } }) => fonts.main.emphasis};
`;
export const section3Circle2 = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 330px;
  height: 330px;
  border-radius: 50%;
  top: -120px;
  left: 35%;
  background-color: ${({ theme: { colors } }) => colors.greyScale.white};
  ${({ theme: { fonts } }) => fonts.main.emphasis};
`;
export const section3Circle3 = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 330px;
  height: 330px;
  border-radius: 50%;
  top: -120px;
  left: 70%;
  background-color: ${({ theme: { colors } }) => colors.greyScale.white};
  ${({ theme: { fonts } }) => fonts.main.emphasis};
`;

// ========================================= Section4

export const Section4 = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 80vh;
  background-color: #262c41;
  top: 300%;
`;
export const Section4Text = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  top: 37%;
  gap: 1%;
  ${({ theme: { fonts } }) => fonts.korean.title};
  color: ${({ theme: { colors } }) => colors.greyScale.white};
  & span {
    top: 1000px;
    color: ${({ theme: { colors } }) => colors.primary.normal};
  }
`;
export const Section4Text2 = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  top: 50%;
  gap: 1%;
  ${({ theme: { fonts } }) => fonts.korean.title};
  color: ${({ theme: { colors } }) => colors.greyScale.white};
  & span {
    top: 1000px;
    color: ${({ theme: { colors } }) => colors.primary.normal};
  }
`;

// ========================================= Section5

export const Section5 = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 180vh;
  background-color: black;
  top: 380%;
`;

// ========================================= Section6
export const Section6 = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 180vh;
  background-color: black;
  top: 480%;
`;
// ========================================= Section7
export const Section7 = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 180vh;
  background-color: black;
  top: 580%;
`;

// ========================================= Section5,6,7 Card와 CardText

export const Card = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1000px;
  height: 450px;
  background-color: #414141;
  border-radius: 2%;
  top: 10%;
`;
export const CardText = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  color: white;
  width: 55%;
  height: 50%;
  left: 40%;
  gap: 30%;
  top: 25%;

  ${({ theme: { fonts } }) => fonts.main.default};
  & span {
    height: 20%;
    top: 90%;
    ${({ theme: { fonts } }) => fonts.main.subTitle};
  }
`;
// ========================================= Section5,6,7 Icon 집합

export const FirstCardIcon1 = styled.img.attrs({ src: `${GhostIcon}` })`
  position: absolute;
  display: flex;
  left: 10%;
  width: 300px;
  height: 300px;
`;
export const FirstCardIcon2 = styled.img.attrs({ src: `${CloudIcon}` })`
  position: absolute;
  display: flex;
  top: 8%;
  width: 300px;
  height: 300px;
`;
export const SecondCardIcon1 = styled.img.attrs({ src: `${EarthIcon}` })`
  position: absolute;
  display: flex;
  left: 10%;
  width: 240px;
  height: 300px;
`;
export const SecondCardIcon2 = styled.img.attrs({ src: `${HeartIcon}` })`
  position: absolute;
  display: flex;
  left: 4%;
  top: 10%;
  width: 183px;
  height: 188px;
`;
export const ThirdCardIcon1 = styled.img.attrs({ src: `${CellPhoneIcon}` })`
  position: absolute;
  display: flex;
  left: 14%;
  width: 170px;
  height: 300px;
`;
export const ThirdCardIcon2 = styled.img.attrs({ src: `${MessageIcon}` })`
  position: absolute;
  display: flex;
  left: 5%;
  top: 25%;
  width: 170px;
  height: 170px;
`;

// ========================================= Section8

export const Section8 = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #434343;
  color: white;
  top: 700%;
  ${({ theme: { fonts } }) => fonts.korean.title};
  & span {
    position: absolute;
    height: 20%;
    top: 20%;
  }
`;
export const LinkGroup = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  top: 45%;
  width: 80%;
`;
export const SignUpLink = styled.img.attrs({ src: `${SignUpIcon}` })`
  position: absolute;
  display: flex;
  width: 250px;
  height: 270px;
  left: 10%;
  cursor: pointer;
`;
export const BoardLink = styled.img.attrs({ src: `${BoardIcon}` })`
  position: absolute;
  display: flex;
  width: 250px;
  height: 270px;
  left: 40%;
  top: 25%;
  cursor: pointer;
`;
export const PostLink = styled.img.attrs({ src: `${PostIcon}` })`
  position: absolute;
  display: flex;
  width: 250px;
  height: 270px;
  left: 70%;
  top: 25%;
  cursor: pointer;
`;

// ========================================= 하단 box

export const BottomBox = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  width: 100%;
  height: 30vh;
  top: 800%;
  background-color: #676767;
`;
export const TextBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  height: 70%;
  left: 10%;
  color: white;
  ${({ theme: { fonts } }) => fonts.korean.default};
  &span {
    ${({ theme: { fonts } }) => fonts.korean.emphasis};
  }
`;
// =========================================
