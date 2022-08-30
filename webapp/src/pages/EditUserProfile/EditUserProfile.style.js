import styled, { css } from 'styled-components';
import { ReactComponent as plusSolidIcon } from 'assets/icons/plus-solid.svg';

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

export const ProfileImageContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
`;

export const ImageThunbnail = styled.img`
  background-color: ${({ theme: { colors } }) => colors.greyScale.background};
  width: 144px;
  height: 144px;
  border-radius: 50%;
  ${({ theme: { mixin } }) => mixin.flexCenter({})};
`;

export const ImageEditButton = css`
  position: absolute;
  width: 80px;
  height: 30px;
  bottom: 50px;
  right: 50px;
`;

export const InputTypeImageHandler = styled.label`
  background-color: ${({ theme: { colors } }) => colors.greyScale.background};
  width: 144px;
  height: 144px;
  border-radius: 50%;
  ${({ theme: { mixin } }) => mixin.flexCenter({})};
  > div {
    background-color: ${({ theme: { colors } }) => colors.primary.normal};
    width: 52px;
    height: 52px;
    border-radius: 50%;
    ${({ theme: { mixin } }) => mixin.flexCenter({})};
  }
  &:hover {
    cursor: pointer;
  }
`;

export const HiddenInputHandler = styled.input`
  display: none;
`;

export const PlusSolid = styled(plusSolidIcon)`
  width: 18px;
  height: 18px;
  & path {
    fill: ${({ theme: { colors } }) => colors.greyScale.white};
    stroke: ${({ theme: { colors } }) => colors.greyScale.white};
  }
`;
