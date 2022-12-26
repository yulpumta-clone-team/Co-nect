import styled, { css } from 'styled-components/macro';

// 레이아웃
export const Layout = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  z-index: ${({ theme: { zIndex } }) => zIndex.modalLayout};
  background-color: rgba(255, 255, 255, 0.75);
`;

export const DialogContainer = styled.dialog`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 749px;
  height: 520px;
  z-index: ${({ theme: { zIndex } }) => zIndex.modalLevel};
  background-color: ${({ theme: { colors } }) => colors.greyScale.white};
  /* border: none; */
  border-radius: 20px;
  ${({ theme: { mixin } }) => mixin.flexCenter({})};
`;

export const Content = styled.div`
  padding: 0 5% 5% 5%;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  > h2 {
    ${({ theme: { fonts } }) => fonts.korean.title}
    color: ${({ theme: { colors } }) => colors.primary.normal};
    margin-top: 100px;
  }
`;

export const InputContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  ${({ theme: { mixin } }) => mixin.positionCenterY()};
  z-index: ${({ theme: { zIndex } }) => zIndex.modalContent};
`;

export const TechSkillContainer = styled(InputContainer)`
  width: 70%;
`;

// 공통 스타일

export const NextButtonContainer = styled.div`
  ${({ theme: { mixin } }) => mixin.flexCenter({})};
  position: absolute;
  top: 75%;
  > span {
    margin-top: 23px;
    ${({ theme: { fonts } }) => fonts.korean.emphasis};
    color: ${({ theme: { colors } }) => colors.greyScale.subTitle};
  }
`;

export const NextButtonContainerInProfileImage = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  position: absolute;
  top: 75%;
`;

// 버튼들

export const NextButton = css`
  width: 268px;
  height: 55px;
  ${({ theme: { fonts } }) => fonts.korean.subTitle};
  color: ${({ theme: { colors } }) => colors.greyScale.white};
`;

export const CloseButton = css`
  position: absolute;
  width: 30px;
  height: 30px;
  right: 4%;
  top: 5%;
  > svg {
    & path {
      fill: ${({ theme: { colors } }) => colors.greyScale.border};
      stroke: ${({ theme: { colors } }) => colors.greyScale.border};
    }
  }
`;

export const AngleContainer = styled.div`
  ${({ theme: { mixin } }) => mixin.positionCenterY()};
  ${({ theme: { mixin } }) => mixin.flexBox({ direction: 'row', justify: 'space-between' })};
  width: 100%;
  padding: 0 4%;
`;

export const AngleButton = css`
  width: 50px;
  height: 50px;
  > svg {
    & path {
      fill: ${({ theme: { colors } }) => colors.greyScale.black};
      stroke: ${({ theme: { colors } }) => colors.greyScale.black};
    }
  }
`;

// 개별스타일

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

export const ImageThunbnail = styled.img`
  background-color: ${({ theme: { colors } }) => colors.greyScale.background};
  width: 144px;
  height: 144px;
  border-radius: 50%;
  ${({ theme: { mixin } }) => mixin.flexCenter({})};
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
