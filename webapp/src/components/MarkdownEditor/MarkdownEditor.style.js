import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  && {
    ${({ customStyle }) => customStyle}
  }
`;
