import styled from 'styled-components/macro';

export const Container = styled.div`
  width: 100%;
  && {
    ${({ customStyle }) => customStyle}
  }
`;

export const Label = styled.label`
  width: 100%;
  display: block;
  align-items: flex-start;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary.normal};
  ${({ theme: { fonts } }) => fonts.korean.emphasis};
  font-weight: 700;
`;
