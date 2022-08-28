import styled from 'styled-components';

export const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;

  ${({ customStyle }) => customStyle}
`;
