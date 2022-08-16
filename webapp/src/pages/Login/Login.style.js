import styled, { css } from 'styled-components';
import { ReactComponent as MainLogoIcon } from 'assets/icons/conect-main.svg';

export const Container = styled.div`
  width: 750px;
  height: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 66px;
  > h1 {
    font-family: 'Arimo';
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 41px;

    color: ${({ theme: { colors } }) => colors.primary.normal};
  }
`;

export const MainLogo = styled(MainLogoIcon)`
  width: 172px;
  height: 164px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  width: 450px;
`;

// TODO: theme 혹은 common버튼의 속성으로 추가하기
export const SubmitButton = css`
  width: 268px;
  height: 55px;
  margin-top: 67px;
`;
