import styled, { css } from 'styled-components';
import { ReactComponent as HeartIcon } from 'assets/icons/heart.svg';
import { ReactComponent as ChatIcon } from 'assets/icons/chat.svg';
import { ReactComponent as PolygonUpIcon } from 'assets/icons/polygon-up.svg';
import { ReactComponent as PolygonDownIcon } from 'assets/icons/polygon-down.svg';

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
`;

export const RootCommentBox = styled.div`
  width: 100%;
  background-color: ${({ theme: { colors } }) => colors.greyScale.background};
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const NestedCommentBox = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  gap: 16px;
  margin-bottom: 20px;
`;

export const SecretCommentBox = styled.div``;

export const PublicCommentBox = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 2px;
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
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
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
  gap: 6px;
  > span {
    /* 000자리 cnt 숫자 */
    font-weight: 400;
    font-size: 12px;
    line-height: 25px;
    color: ${({ theme: { COLORS } }) => COLORS.GRAY[900]};
  }
`;

export const EditButton = styled.button`
  font-weight: 400;
  font-size: 12px;
  line-height: 25px;
  color: ${({ theme: { COLORS } }) => COLORS.GRAY[900]};
`;

export const HeartSvg = styled(HeartIcon)`
  width: 15px;
  height: 15px;
  & path {
    fill: ${({ theme: { COLORS } }) => COLORS.GRAY[900]};
    stroke: ${({ theme: { COLORS } }) => COLORS.GRAY[900]};
  }
`;

export const ChatSvg = styled(ChatIcon)`
  width: 15px;
  height: 15px;
  & path {
    fill: ${({ theme: { COLORS } }) => COLORS.GRAY[900]};
    stroke: ${({ theme: { COLORS } }) => COLORS.GRAY[900]};
  }
`;

export const ReplyButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  color: ${({ theme: { colors } }) => colors.primary.normal};
  /* polygon button */
  > button {
    display: flex;
    align-items: center;
    gap: 10px;
    > span {
      font-weight: 400;
      font-size: 13px;
      line-height: 24px;
    }
  }
`;

export const PolygonDownSvg = styled(PolygonDownIcon)`
  width: 8px;
  height: 8px;
  & path {
    fill: ${({ theme: { colors } }) => colors.primary.normal};
    stroke: ${({ theme: { colors } }) => colors.primary.normal};
  }
`;

export const PolygonUpSvg = styled(PolygonUpIcon)`
  width: 8px;
  height: 8px;
  & path {
    fill: ${({ theme: { colors } }) => colors.primary.normal};
    stroke: ${({ theme: { colors } }) => colors.primary.normal};
  }
`;
