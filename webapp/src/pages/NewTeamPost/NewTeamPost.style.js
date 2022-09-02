import styled, { css } from 'styled-components';
import { ReactComponent as addImg } from 'assets/icons/add-img.svg';

export const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 14%;
  border: 20px 20px 0px 0px;
  background-color: ${({ theme: { colors } }) => colors.greyScale.background};
`;
export const ViewingImage = styled.img`
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
export const AddImage = styled(addImg)`
  width: 50px;
  height: 50px;
`;

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
  width: 610px;
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
export const SubmitButton = css`
  width: 270px;
  height: 56px;
  margin-top: 19px;
  ${({ theme: { fonts } }) => fonts.english.title};
`;
export const PostInfoContainer = styled.div`
  padding: 32px 55px;
  width: 100%;
`;
