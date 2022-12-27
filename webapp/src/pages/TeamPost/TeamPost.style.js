import styled, { css } from 'styled-components/macro';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const PostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1250px;
  height: 1300px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  ${({ theme: { fonts } }) => fonts.korean.emphasis};
`;

export const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 300px;
  border-radius: 20px 20px 0px 0px;
  background-color: ${({ theme: { colors } }) => colors.greyScale.background};
  position: relative;
`;

export const ViewingImage = css`
  background-color: ${({ theme: { colors } }) => colors.greyScale.background};
  width: 100%;
  height: 100%;
  border-radius: 20px 20px 0px 0px;
  ${({ theme: { mixin } }) => mixin.flexCenter({})};
`;

export const EmptyImage = styled.div`
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
  gap: 1.5rem;
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

export const SingleInfoTitle = styled.span`
  color: ${({ theme: { colors } }) => colors.primary.normal};
  ${({ theme: { fonts } }) => fonts.korean.emphasis};
  font-weight: 700;
`;

export const TeamName = styled(SingleInfoTitle)`
  ${({ theme: { fonts } }) => fonts.korean.title};
  color: #3c3c3c;
`;

export const Slogan = styled(SingleInfoTitle)`
  ${({ theme: { fonts } }) => fonts.korean.subTitle};
  font-weight: 700;
  color: #3c3c3c;
`;

export const TeamSkillSession = styled(SingleInfoTitle)`
  position: relative;
  width: 3%;
`;

export const PostInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
`;

export const SinglePostInfo = styled.div`
  display: flex;
  gap: 10px;
  svg {
    width: 25px;
    height: 25px;
    & path {
      stroke: ${({ theme: { colors } }) => colors.primary.normal};
      fill: ${({ theme: { colors } }) => colors.primary.normal};
    }
  }
`;
