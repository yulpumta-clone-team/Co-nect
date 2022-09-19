import { colors } from '@storybook/node-logger';
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

export const CommentBox = styled.div`
  width: 100%;
  display: flex;
  padding-left: 40px;
  background-color: ${({ theme: { colors } }) => colors.greyScale.background};
`;

export const RootCommentBox = styled.div``;

export const NestedCommentBox = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 8px;
  padding-left: 50px;
`;

export const SecretCommentBox = styled.div``;

export const PublicCommentBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const UserInfo = styled.div`
  width: 20%;
  img {
    width: 30px;
    height: 30px;
  }
`;

export const ContentInfo = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LikeInfo = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
`;

export const ThumbSVG = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid black;
  background-color: ${({ isFill }) => (isFill ? '#ff7600' : '#fff')};
  margin: 0 10px;
  &:hover {
    cursor: pointer;
  }
`;

export const ReplyButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
