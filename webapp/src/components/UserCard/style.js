import styled from 'styled-components';

export const CardWrapper = styled.li`
  position: relative;
  width: 368px;
  height: 429px;
  justify-content: center;
  background: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

export const CardTop = styled.div`
  position: relative;
  display: flex;
  height: 50px;
  width: 100%;
  background: #036eff;
  border-radius: 10px 10px 0px 0px;
`;

export const Heart = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  > img {
    width: 40%;
    height: 100%;
  }
`;
export const ProfileImg = styled.img`
  position: absolute; // relative로 바꾸면 동그란 이미지가 깨짐
  display: flex;
  width: 100px;
  height: 100px;
  left: 243px;
  top: 80px;

  border-radius: 50%;
`;
export const BackgroundImg = styled.div`
  position: relative;
  align-items: flex-start;
  display: flex;
  width: 100%;
  height: 20%;
  background: #eaeaea;
  padding: 1em;
`;

export const UserInfo = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 35%;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 1em;
`;

export const Name = styled.div`
  position: relative;
  display: grid;
  height: 40%;
  width: 100%;
  align-items: center;
  ${({ theme: { fonts } }) => fonts.korean.title}
  font-weight: 700;
`;

export const Team = styled.li`
  position: relative;
  display: flex;

  justify-content: space-between;
  align-items: center;
  width: 45%;

  ${({ theme: { fonts } }) => fonts.korean.default}
  font-weight: 700;
  > img {
    width: 20px;
    height: 20px;
    object-fit: cover;
  }
`;
export const Session = styled.li`
  position: relative;
  display: flex;

  width: 80%;
  ${({ theme: { fonts } }) => fonts.korean.default}
  font-weight: 700;
`;
export const UserSession = styled.li`
  position: relative;
  display: flex;

  ${({ theme: { fonts } }) => fonts.korean.default}
`;

export const Job = styled.div`
  background-color: ${({ theme: { colors } }) => colors.secondary.normal};

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 78px;
  height: 28px;
  border-radius: 50px;

  color: ${({ theme: { colors } }) => colors.greyScale.white};
  ${({ theme: { fonts } }) => fonts.korean.default}
`;

export const Divider = styled.div`
  top: 20px;
  height: 2px;
  width: 100%;
  background: ${({ theme: { colors } }) => colors.greyScale.nonActive};
`;
export const Skills = styled.div`
  position: absolute;
  display: flex;
  height: 60px;
  width: 500px;
  left: 20px;

  border: 1px solid red;
`;

export const Skill = styled.div`
  position: relative;
  display: flex;
  height: 82px;
  width: 320px;
  overflow: hidden;

  align-items: center;
  background-color: #f5f5f5;

  justify-content: space-around;

  > img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 70%;
  }
`;

export const SkillBoard = styled.div`
  position: relative;
  display: flex;
  height: 20%;
  width: 100%;
  justify-content: space-between;
  padding: 0px 10px 0px;
  > img {
    width: 10px;
    height: 60px;
  }
`;

export const CountBoard = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 12%;
  width: 100%;
  justify-content: flex-end;
  padding: 1em;
  > img {
    width: 15%;
    height: 100%;
  }
`;
