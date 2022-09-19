import styled, { css } from 'styled-components';

export const FormBox = styled.div`
  textarea {
    resize: none;
    width: 100%;
    overflow: hidden;
    scrollbar-width: none;
  }
  textarea,
  p {
    display: block;
    width: 100%;
    height: auto;
    line-height: 1.5;
  }
`;

export const ListBox = styled.ul`
  width: 100%;
  box-sizing: border-box;
`;

export const CommentContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

export const RootCommentBox = styled.div`
  width: 100%;
  background-color: ${({ theme: { colors } }) => colors.greyScale.background};
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const NestedCommentBox = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 8px;
`;

export const SecretCommentBox = styled.div``;

export const PublicCommentBox = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
`;

export const CommentTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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
    color: ${({ theme: { COLORS } }) => COLORS.GRAY[900]};
  }
`;

export const CommentContent = styled.p`
  color: ${({ theme: { COLORS } }) => COLORS.GRAY[900]};
`;

export const UserProfileImage = css`
  width: 30px;
  height: 30px;
`;

// ! 지워야함
export const ContentInfo = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CommentInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 5px;
`;

export const SpecificInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const ThumbSVG = styled.div`
  width: 12.5px;
  height: 12.5px;
  border-radius: 50%;
  border: 1px solid black;
  background-color: ${({ isFill }) => (isFill ? '#ff7600' : '#fff')};
  &:hover {
    cursor: pointer;
  }
`;

export const ReplyButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;
