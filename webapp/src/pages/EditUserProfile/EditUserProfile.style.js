import styled, { css } from 'styled-components/macro';

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

export const InlineInputContainer = styled.div`
  display: flex;
  gap: 19px;
  width: 100%;
  > div {
    width: 60%;
  }
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

export const ImageThunbnail = css`
  background-color: ${({ theme: { colors } }) => colors.greyScale.background};
  width: 144px;
  height: 144px;
  border-radius: 50%;
  ${({ theme: { mixin } }) => mixin.flexCenter({})};
`;

export const InputTypeImageHandler = styled.label`
  position: relative;
  background-color: ${({ theme: { colors } }) => colors.greyScale.background};
  width: 144px;
  height: 144px;
  border-radius: 50%;
  ${({ theme: { mixin } }) => mixin.flexCenter({})};
  &:hover {
    cursor: pointer;
  }
`;

export const HiddenInputHandler = styled.input`
  display: none;
`;

export const ImageEditButton = styled.button`
  position: absolute;
  width: 40px;
  height: 40px;
  bottom: 5%;
  right: 5%;
  border-radius: 50%;
  background-color: ${({ theme: { colors } }) => colors.secondary.normal};
  > svg {
    & path {
      stroke: ${({ theme: { colors } }) => colors.greyScale.white};
      fill: ${({ theme: { colors } }) => colors.greyScale.white};
    }
  }
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
