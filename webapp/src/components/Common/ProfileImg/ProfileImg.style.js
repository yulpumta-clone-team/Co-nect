import styled from 'styled-components/macro';

export const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;

  ${({ customStyle }) => customStyle}
`;
