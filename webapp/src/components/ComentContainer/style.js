import styled, { css } from 'styled-components';
import { ReactComponent as HeartIcon } from 'assets/icons/heart.svg';
import { ReactComponent as ChatIcon } from 'assets/icons/chat.svg';
import { ReactComponent as PolygonUpIcon } from 'assets/icons/polygon-up.svg';
import { ReactComponent as PolygonDownIcon } from 'assets/icons/polygon-down.svg';
import { ReactComponent as RecycleBinIcon } from 'assets/icons/recycle-bin.svg';
import { ReactComponent as LockIcon } from 'assets/icons/lock.svg';

export const Container = styled.div`
  width: 100%;
`;

export const FormBox = styled.div`
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
  }
  textarea,
  p {
    display: block;
    width: 100%;
    height: ${({ isNested }) => (isNested ? '60px' : '110px')};
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

export const RecycleBinSvg = styled(RecycleBinIcon)`
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

export const HeartSvg = styled(HeartIcon)`
  width: 15px;
  height: 15px;
  & path {
    fill: ${({ isNested, theme: { COLORS } }) => (isNested ? COLORS.GRAY[700] : COLORS.GRAY[900])};
    stroke: ${({ isNested, theme: { COLORS } }) =>
      isNested ? COLORS.GRAY[700] : COLORS.GRAY[900]};
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

export const LockSvg = styled(LockIcon)`
  & path {
    fill: ${({ isNested, theme: { colors } }) =>
      isNested ? colors.greyScale.subTitle : colors.primary.normal};
    stroke: ${({ isNested, theme: { colors } }) =>
      isNested ? colors.greyScale.subTitle : colors.primary.normal};
  }
`;
