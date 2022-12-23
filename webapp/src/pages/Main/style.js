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

export const MainContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding-top: 24px;
`;
export const Card = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50%;
  background-color: #414141;
  border-radius: 2%;
`;
export const CardText = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  color: white;
  width: 50%;
  left: 40%;
  gap: 10%;
  & span {
    height: 50%;
    ${({ theme: { fonts } }) => fonts.korean.title};
  }
`;
export const Section1 = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 120vh;
  background-color: black;
`;
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
export const section3Circle1 = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  top: -200px;
  left: 50px;
  background-color: ${({ theme: { colors } }) => colors.greyScale.white};
  ${({ theme: { fonts } }) => fonts.korean.title};
`;
export const section3Circle2 = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  top: -200px;
  left: 350px;
  background-color: ${({ theme: { colors } }) => colors.greyScale.white};
  ${({ theme: { fonts } }) => fonts.korean.subTitle};
`;
export const section3Circle3 = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  top: -200px;
  left: 650px;
  background-color: ${({ theme: { colors } }) => colors.greyScale.white};
  ${({ theme: { fonts } }) => fonts.korean.subTitle};
`;
export const CircleGroup = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 80%;
`;
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
  flex-direction: column;
  align-items: center;
  height: 30%;
  ${({ theme: { fonts } }) => fonts.korean.title};
  color: ${({ theme: { colors } }) => colors.greyScale.white};
  & span {
    top: 1000px;
    color: ${({ theme: { colors } }) => colors.primary.normal};
  }
`;
export const Section5 = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120vh;
  background-color: black;
  top: 380%;
`;
export const Section6 = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120vh;
  background-color: black;
  top: 480%;
`;
export const Section7 = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120vh;
  background-color: black;
  top: 580%;
`;
export const Section8 = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 120vh;
  background-color: #434343;
  color: white;
  top: 680%;
  ${({ theme: { fonts } }) => fonts.korean.title};
  & span {
    position: absolute;
    height: 20%;
    top: 20%;
  }
`;
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
export const MainGradient = styled.div`
  background-image: url(${Gradient});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
export const MainText = styled.div`
  position: relative;
  letter-spacing: 0.01em;
  width: 50%;
  height: 15%;
  left: 50px;
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
  width: 45%;
  height: 15%;
  color: white;
  ${({ theme: { fonts } }) => fonts.korean.emphasis};
`;
export const Logo = styled.img.attrs({ src: `${MainLogo}` })`
  position: absolute;
  display: flex;
  top: 90px;
  width: 100px;
  height: 100px;
`;
export const Section2BG = styled.div`
  background-image: url(${BackGround2});
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  & span {
    top: 1000px;
    color: ${({ theme: { colors } }) => colors.primary.normal};
  }
`;

export const FirstCardIcon1 = styled.img.attrs({ src: `${GhostIcon}` })`
  position: absolute;
  display: flex;
  left: 12%;
  width: 150px;
  height: 150px;
`;
export const FirstCardIcon2 = styled.img.attrs({ src: `${CloudIcon}` })`
  position: absolute;
  display: flex;
  left: 3%;
  top: 20%;
  width: 150px;
  height: 150px;
`;
export const SecondCardIcon1 = styled.img.attrs({ src: `${EarthIcon}` })`
  position: absolute;
  display: flex;
  left: 12%;
  width: 120px;
  height: 150px;
`;
export const SecondCardIcon2 = styled.img.attrs({ src: `${HeartIcon}` })`
  position: absolute;
  display: flex;
  left: 6%;
  top: 20%;
  width: 110px;
  height: 110px;
`;
export const ThirdCardIcon1 = styled.img.attrs({ src: `${CellPhoneIcon}` })`
  position: absolute;
  display: flex;
  left: 12%;
  width: 120px;
  height: 250px;
`;
export const ThirdCardIcon2 = styled.img.attrs({ src: `${MessageIcon}` })`
  position: absolute;
  display: flex;
  left: 3%;
  top: 25%;
  width: 120px;
  height: 120px;
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
  width: 200px;
  height: 200px;
  left: 100px;
  cursor: pointer;
`;
export const BoardLink = styled.img.attrs({ src: `${BoardIcon}` })`
  position: absolute;
  display: flex;
  left: 400px;
  top: 25%;
  width: 200px;
  height: 200px;
  cursor: pointer;
`;
export const PostLink = styled.img.attrs({ src: `${PostIcon}` })`
  position: absolute;
  display: flex;
  left: 700px;
  top: 25%;
  width: 200px;
  height: 200px;
  cursor: pointer;
`;
