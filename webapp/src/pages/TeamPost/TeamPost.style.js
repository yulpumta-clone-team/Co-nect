import styled, { css } from 'styled-components/macro';

export const Container = styled.div`
  margin: 0 auto;
  padding-bottom: 10px; // postContainer아래 border가 짤려서 어쩔 수 없이 pading속성 추가
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const PostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1100px;
  background-color: ${({ theme: { colors } }) => colors.greyScale.white};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  ${({ theme: { fonts } }) => fonts.korean.emphasis};
`;

export const ImgContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 300px;
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

export const WriterInfo = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  position: absolute; // ImgContainer 기준
  bottom: 18px;
  left: 36px;
`;

export const WriterName = styled.span`
  ${({ theme: { fonts } }) => fonts.korean.emphasis};
  font-weight: 700;
`;

export const WriterProfileImage = css`
  width: 30px;
  height: 30px;
`;

export const TeamInfoContainer = styled.div`
  padding: 33px 36px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const CommentDivider = css`
  background-color: ${({ theme: { colors } }) => colors.primary.normal};
`;

export const SingleInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;

  > div {
    width: 70%;
  }
`;

export const SingleInfoTitle = styled.h5`
  color: ${({ theme: { colors } }) => colors.primary.normal};
  ${({ theme: { fonts } }) => fonts.korean.emphasis};
`;

export const TeamName = styled.h2`
  ${({ theme: { fonts } }) => fonts.korean.title};
  font-weight: 400;
  font-size: 40px;
  line-height: 32px;
`;

export const Slogan = styled.h4`
  ${({ theme: { fonts } }) => fonts.korean.title};
`;
