import styled, { css } from 'styled-components';
import { ReactComponent as plusSolidIcon } from 'assets/icons/plus-solid.svg';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const Form = styled.form`
  display: flex;
  width: 800px;
  justify-content: space-between;
  margin: 0 auto;
`;

export const InfoContainer = styled.div`
  width: 650px;
  ${({ theme: { mixin } }) => mixin.flexCenter({})};
  border: 3px solid ${({ theme: { colors } }) => colors.primary.normal};
  border-radius: 20px;
  padding: 55px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1.5rem;
`;

export const ButtonContainer = styled.div`
  width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
`;

// TODO: theme 혹은 common버튼의 속성으로 추가하기
export const SubmitButton = css`
  width: 270px;
  height: 56px;
  margin-top: 19px;
  ${({ theme: { fonts } }) => fonts.english.title};
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
  align-self: flex-end;
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
