import styled from 'styled-components';

export const Image = styled.img`
  width: 30%;
  height: 25%;
  border-radius: 50%;

  ${({ customStyle }) => customStyle}
`;
