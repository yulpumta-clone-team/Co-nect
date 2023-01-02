import styled from 'styled-components/macro';

export const Image = styled.img`
  width: 100%;
  height: 100%;

  ${({ customStyle }) => customStyle}
`;
