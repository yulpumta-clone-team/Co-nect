import styled, { css } from 'styled-components/macro';

export const Container = styled.div`
  width: 100%;
`;

export const FormBox = styled.form`
  width: 100%;
  background-color: ${({ theme: { colors } }) => colors.greyScale.background};
  padding: 12px 15px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  textarea {
    resize: none;
    width: 100%;
    overflow: hidden;
    scrollbar-width: none;
    background-color: ${({ theme: { colors } }) => colors.greyScale.white};
    padding: 8px;
    height: 100%;
    height: ${({ isNested }) => (isNested ? '60px' : '110px')};
  }
  textarea,
  p {
    display: block;
    width: 100%;
    height: 100%;
    line-height: 1.5;
  }
`;

export const FormButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const FormSubmitButton = css`
  border-radius: 0;
  width: 115px;
  height: 35px;
`;

export const RootListContainer = styled.ul`
  width: 100%;
  box-sizing: border-box;
`;

export const NestedListContainer = styled.ul`
  width: 100%;
  box-sizing: border-box;
  padding-left: 10px;
`;

export const CommentContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
`;

export const RootCommentBox = styled.div`
  background-color: ${({ theme: { colors } }) => colors.greyScale.background};
  padding: 7px 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const NestedCommentBox = styled.div`
  background-color: ${({ theme: { colors } }) => colors.greyScale.background};
  padding-bottom: 7px;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 2px;
`;

export const SecretCommentBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  > span {
    ${({ isNested, theme: { COLORS } }) => {
      if (isNested) {
        return css`
          font-weight: 400;
          font-size: 13px;
          line-height: 24px;
          color: ${COLORS.GRAY[700]};
        `;
      }
      return css`
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: ${COLORS.GRAY[900]};
      `;
    }};
  }
`;

export const PublicCommentBox = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 2px;
`;

export const CommentTitle = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ isNested, theme: { COLORS } }) => (isNested ? COLORS.GRAY[700] : COLORS.GRAY[900])};
  > h3 {
    /* Kor_main_b */
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
  }
  > span {
    font-weight: 400;
    font-size: 12px;
    line-height: 24px;
  }
  > button {
    position: absolute;
    right: 0;
  }
`;

export const RecycleBinSvg = styled.div`
  width: 16px;
  height: 16px;
  & path {
    fill: ${({ theme: { colors } }) => colors.primary.normal};
    stroke: ${({ theme: { colors } }) => colors.primary.normal};
  }
`;

export const CommentContent = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${({ isNested, theme: { COLORS } }) => (isNested ? COLORS.GRAY[700] : COLORS.GRAY[900])};
`;

export const UserProfileImage = css`
  width: 30px;
  height: 30px;
`;

export const CommentInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 5px;
`;

export const SpecificInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  > span {
    /* 000자리 cnt 숫자 */
    font-weight: 700;
    font-size: 12px;
    line-height: 25px;
    color: ${({ isNested, theme: { COLORS } }) => (isNested ? COLORS.GRAY[700] : COLORS.GRAY[900])};
  }
`;

export const EditButton = styled.button`
  font-weight: 700;
  font-size: 12px;
  line-height: 25px;
  color: ${({ isNested, theme: { COLORS } }) => (isNested ? COLORS.GRAY[700] : COLORS.GRAY[900])};
`;

export const HeartButton = styled.button`
  width: 15px;
  height: 15px;
  > svg {
    width: 100%;
    height: 100%;
    & path {
      fill: ${({ isNested, theme: { COLORS } }) =>
        isNested ? COLORS.GRAY[700] : COLORS.GRAY[900]};
      stroke: ${({ isNested, theme: { COLORS } }) =>
        isNested ? COLORS.GRAY[700] : COLORS.GRAY[900]};
    }
  }
`;

export const Chat = styled.div`
  width: 15px;
  height: 15px;
  > svg {
    width: 100%;
    height: 100%;
    & path {
      fill: ${({ theme: { COLORS } }) => COLORS.GRAY[900]};
      stroke: ${({ theme: { COLORS } }) => COLORS.GRAY[900]};
    }
  }
`;

export const ReplyButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${({ theme: { colors } }) => colors.primary.normal};
  gap: 10px;
  > svg {
    width: 1.1rem;
    height: 1.1rem;
    & path {
      fill: ${({ theme: { colors } }) => colors.primary.normal};
      stroke: ${({ theme: { colors } }) => colors.primary.normal};
    }
  }
  > span {
    font-weight: 400;
    font-size: 13px;
    line-height: 24px;
  }
`;

export const Lock = styled.div`
  > svg {
    & path {
      fill: ${({ isNested, theme: { colors } }) =>
        isNested ? colors.greyScale.subTitle : colors.primary.normal};
      stroke: ${({ isNested, theme: { colors } }) =>
        isNested ? colors.greyScale.subTitle : colors.primary.normal};
    }
  }
`;
