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
    ${({ theme: { fonts } }) => fonts.korean.title}
  }
  > span {
    font-family: 'Sandoll GothicNeo1';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;

    color: ${({ theme: { colors } }) => colors.greyScale.subTitle};
    ${({ theme: { fonts } }) => fonts.korean.emphasis}
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
  height: 100%;
  gap: 15px;
`;

export const DuplicateCheckButton = css`
  width: 120px;
  height: 34px;
  padding: 5px 20px;
  ${({ theme: { fonts } }) => fonts.korean.default}
`;

// TODO: theme 혹은 common버튼의 속성으로 추가하기
export const SubmitButton = css`
  width: 268px;
  height: 55px;
  margin-top: 73px;
  ${({ theme: { fonts } }) => fonts.english.emphasis}
`;
