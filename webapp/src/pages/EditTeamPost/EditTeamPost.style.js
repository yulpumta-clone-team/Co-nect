import styled, { css } from 'styled-components/macro';

export const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 144px;
  border-radius: 20px 20px 0px 0px;
  background-color: ${({ theme: { colors } }) => colors.greyScale.background};
`;
export const ViewingImage = css`
  background-color: ${({ theme: { colors } }) => colors.greyScale.background};
  width: 100%;
  height: 100%;
  border-radius: 20px 20px 0px 0px;
  ${({ theme: { mixin } }) => mixin.flexCenter({})};
`;

export const ImageEditButton = styled.button`
  position: absolute;
  width: 50px;
  height: 50px;
  right: 5%;
  bottom: 10%;
  border-radius: 50%;
  background-color: ${({ theme: { colors } }) => colors.secondary.normal};
  > svg {
    & path {
      stroke: ${({ theme: { colors } }) => colors.greyScale.white};
      fill: ${({ theme: { colors } }) => colors.greyScale.white};
    }
  }
`;
export const InputTypeImageHandler = styled.label`
  position: relative;
  background-color: ${({ theme: { colors } }) => colors.greyScale.background};
  width: 100%;
  height: 100%;
  border-radius: 20px 20px 0px 0px;
  ${({ theme: { mixin } }) => mixin.flexCenter({})};
  &:hover {
    cursor: pointer;
  }
`;
export const HiddenInputHandler = styled.input`
  display: none;
`;
export const AddImage = styled.button`
  pointer-events: none; // label 안에 있는 button은 htmlfor가 작동하지 않아 해당 이벤트를 꺼야함 https://dilshankelsen.com/button-inside-label-not-triggering-input/
  background-color: ${({ theme: { colors } }) => colors.primary.normal};
  width: 52px;
  height: 52px;
  border-radius: 50%;
  ${({ theme: { mixin } }) => mixin.flexCenter({})};
  > svg {
    & path {
      width: 50px;
      height: 50px;
      stroke: ${({ theme: { colors } }) => colors.greyScale.white};
      fill: ${({ theme: { colors } }) => colors.greyScale.white};
    }
  }
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
  width: 650px;
  ${({ theme: { mixin } }) => mixin.flexCenter({})};
  border: 3px solid ${({ theme: { colors } }) => colors.primary.normal};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;
export const ButtonContainer = styled.div`
  width: 500px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
`;
export const SubmitButton = css`
  width: 270px;
  height: 56px;
  margin-top: 19px;
  ${({ theme: { fonts } }) => fonts.korean.title};
  font-size: 1.6rem; // size 따로 지정해준건, 해당 theme이 없었기 때문입니다.
`;
export const PostInfoContainer = styled.div`
  padding: 20px 55px 50px 55px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
