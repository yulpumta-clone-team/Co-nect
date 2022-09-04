import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 15px;
  width: 1100px;
  height: 1250px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;

export const CommentDivider = css`
  width: 95%;
  background-color: ${({ theme: { colors } }) => colors.primary.normal};
`;
