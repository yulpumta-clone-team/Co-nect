import styled, { css } from 'styled-components';

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
  gap: 30px;
  margin: 106px;
  > h2 {
    font-family: 'Sandoll GothicNeo1';
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 28px;

    color: ${({ theme: { colors } }) => colors.primary.normal};
  }
  > span {
    font-family: 'Sandoll GothicNeo1';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;

    color: ${({ theme: { colors } }) => colors.greyScale.subTitle};
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  width: 450px;
`;

export const DuplicateCheckInput = styled.div`
  display: flex;
  width: 100%;
  gap: 15px;
`;

export const DuplicateCheckButton = css`
  width: 120px;
  /* eng_main_bold */
  font-family: 'Arimo';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
`;

// TODO: theme 혹은 common버튼의 속성으로 추가하기
export const SubmitButton = css`
  width: 268px;
  height: 55px;
  margin-top: 73px;
`;
