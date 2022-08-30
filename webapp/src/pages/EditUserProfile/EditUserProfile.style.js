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
  padding: 55px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 6rem;
`;

export const UserInfoContainer = styled.div`
  padding: 32px 55px;
  width: 100%;
`;

export const DuplicateCheckInput = styled.div`
  display: flex;
  width: 100%;
  gap: 15px;
`;

export const DuplicateCheckButton = css`
  width: 120px;
  height: 34px;
  padding: 5px 20px;
  ${({ theme: { fonts } }) => fonts.korean.default}
`;
