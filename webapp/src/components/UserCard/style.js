import styled, { css } from 'styled-components';

export const CardWrapper = styled.li`
  position: relative;
  display: flex;
  height: 450px;
  width: 50%;
  justify-content: center;
  flex-wrap: wrap;
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

export const Image = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  height: 100%;
  > img {
    width: 40%;
    height: 100%;
  }
`;
export const BackgroundImg = styled.div`
  position: relative;
  align-items: flex-start;
  display: flex;
  width: 100%;
  height: 20%;
  background: #eaeaea;
`;

export const UserInfo = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  > h2 {
    font-family: 'Sandoll GothicNeo1';
    font-style: normal;
    font-weight: 800;
    font-size: 25px;
    line-height: 28px;
  }
`;

export const Job = styled.button`
  background-color: ${({ theme: { colors } }) => colors.secondary.normal};
  padding: 5px 20px;
  gap: 10px;

  width: 80px;
  height: 25px;
  border-radius: 50px;
`;
