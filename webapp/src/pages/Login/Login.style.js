import styled, { css } from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 66px;
  > h1 {
    ${({ theme: { fonts } }) => fonts.english.title}
    color: ${({ theme: { colors } }) => colors.primary.normal};
  }
`;

export const MainLogo = styled.img`
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
  ${({ theme: { fonts } }) => fonts.english.title}
`;
