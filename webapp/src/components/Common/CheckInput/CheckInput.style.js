import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 11px;
  align-items: center;
  > svg {
    width: 20px;
    height: 20px;
  }
  && {
    ${({ customStyle }) => customStyle}
  }
`;
