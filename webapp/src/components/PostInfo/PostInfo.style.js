import styled from 'styled-components/macro';

export const PostInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
`;

export const SinglePostInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  svg {
    width: 25px;
    height: 25px;
    & path {
      stroke: ${({ theme: { colors } }) => colors.primary.normal};
      fill: ${({ theme: { colors } }) => colors.primary.normal};
    }
  }
`;
