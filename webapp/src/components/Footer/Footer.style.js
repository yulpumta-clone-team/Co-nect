import styled from 'styled-components';

export const Container = styled.footer`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 460px;
  color: #fff;
  background-color: #676767;
  padding: 73px 83px;
`;
export const InformationBox = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  > h2 {
    ${({ theme: { fonts } }) => fonts.korean.subTitle};
    margin-bottom: 20px;
  }
  > li {
    ${({ theme: { fonts } }) => fonts.korean.default};
    > span:not(:first-child) {
      display: inline-flex;
      width: 98px;
    }
    > a {
      &:hover {
        color: ${({ theme: { colors } }) => colors.primary.light};
      }
    }
  }
`;

export const Name = styled.span`
  ${({ theme: { fonts } }) => fonts.korean.emphasis};
  display: inline-flex;
  width: 64px;
`;
