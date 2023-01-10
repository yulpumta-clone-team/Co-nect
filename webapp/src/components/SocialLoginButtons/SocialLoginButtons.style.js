import styled from 'styled-components/macro';

export const Container = styled.div`
  ${({ theme: { mixin } }) => mixin.flexCenter({})}
  > span {
    width: 228px;
    height: 32px;
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;
    color: ${({ theme: { colors } }) => colors.greyScale.subTitle};
    ${({ theme: { fonts } }) => fonts.korean.subTitle}
  }
`;

export const Buttons = styled.div`
  display: flex;
  gap: 21px;
  margin-top: 45px;
`;

export const Button = styled.button`
  width: 55px;
  height: 55px;
  ${({ theme: { mixin } }) => mixin.flexCenter({})}

  background: ${({ theme: { colors } }) => colors.greyScale.white};
  box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  padding: 8px;
`;
