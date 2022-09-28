import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const PostContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 57px;
`;

export const ProfileImageContainer = styled.div`
  width: 200px;
  height: 200px;
`;

export const InfoContainer = styled.div`
  width: 610px;
  ${({ theme: { mixin } }) => mixin.flexCenter({})};
  border: 3px solid ${({ theme: { colors } }) => colors.primary.normal};
  border-radius: 20px;
  padding: 35px;
`;

export const UserInfoContainer = styled.div`
  padding: 0 20px;
  width: 100%;
`;

export const SingleInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 20px;
  > span {
    width: 30%;
  }
  > div {
    width: 70%;
  }
`;

export const PortfolioLink = styled.a`
  :hover {
    color: ${({ theme: { colors } }) => colors.primary.normal};
  }
`;

export const SingleInfoTitle = styled.span`
  color: ${({ theme: { colors } }) => colors.primary.normal};
  ${({ theme: { fonts } }) => fonts.korean.emphasis};
`;

export const CommentDivder = css`
  width: 100%;
  background-color: ${({ theme: { colors } }) => colors.primary.normal};
`;

export const PostInfo = styled.div`
  margin: 12px 0 32px 0;
`;
