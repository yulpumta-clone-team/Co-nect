import styled, { css } from 'styled-components/macro';

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const PostContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 57px;
`;

export const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 200px;
  > img {
    width: 100%;
    height: 100%;
  }
`;

export const UserName = styled.span`
  ${({ theme: { fonts } }) => fonts.korean.subTitle}
  margin: 20px 0 12px 0;
`;

export const UserJob = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 78px;
  height: 36px;
  border-radius: 50px;

  color: ${({ theme: { colors } }) => colors.greyScale.white};
  background-color: ${({ theme: { colors } }) => colors.secondary.normal};
  ${({ theme: { fonts } }) => fonts.korean.default}
`;

export const InfoContainer = styled.div`
  width: 610px;
  ${({ theme: { mixin } }) => mixin.flexCenter({})};
  border: 3px solid ${({ theme: { colors } }) => colors.primary.normal};
  border-radius: 20px;
  padding: 35px;
  gap: 1.5rem;
`;

export const UserInfoContainer = styled.div`
  padding: 0 20px;
  width: 100%;
`;

export const Slogan = styled.h3`
  width: 100%;
  ${({ theme: { fonts } }) => fonts.korean.title}
  margin-bottom: 24px;
`;

export const SingleInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 20px;
  > h5 {
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

export const SingleInfoTitle = styled.h5`
  color: ${({ theme: { colors } }) => colors.primary.normal};
  ${({ theme: { fonts } }) => fonts.korean.emphasis};
  align-self: flex-start;
`;

export const CommentDivder = css`
  width: 100%;
  background-color: ${({ theme: { colors } }) => colors.primary.normal};
`;

export const PostInfo = styled.div`
  margin: 12px 0 32px 0;
`;
