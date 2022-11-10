import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const PostContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 57px;
`;

export const ImgContainer = styled.div`
  width: 200px;
  height: 200px;
`;

export const ViewingImage = styled.img`
  background-color: ${({ theme: { colors } }) => colors.greyScale.background};
  width: 100%;
  height: 100%;
  border-radius: 20px 20px 0px 0px;
  ${({ theme: { mixin } }) => mixin.flexCenter({})};
`;

export const TeamInfoContainer = styled.div`
  width: 610px;
  ${({ theme: { mixin } }) => mixin.flexCenter({})};
  border: 3px solid ${({ theme: { colors } }) => colors.primary.normal};
  border-radius: 20px;
  padding: 35px;
`;

export const CommentDivider = css`
  background-color: ${({ theme: { colors } }) => colors.primary.normal};
`;

export const SingleInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 2%;
  margin-bottom: 20px;
  > span {
    width: 30%;
  }
  > div {
    width: 87%;
  }
`;
export const SingleInfoTitle = styled.span`
  color: ${({ theme: { colors } }) => colors.primary.normal};
  ${({ theme: { fonts } }) => fonts.korean.emphasis};
  ${({ customStyle }) => customStyle}
`;
export const UserName = styled.div`
  position: absolute;
  top: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
  ${({ theme: { fonts } }) => fonts.korean.emphasis};
  font-weight: 700;
`;
export const Skill = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  > span {
    width: 10%;
    ${({ theme: { fonts } }) => fonts.korean.emphasis};
    font-weight: 700;
  }
  > div {
    width: 70%;
  }
`;
export const HopeSession = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  > span {
    width: 10%;
    ${({ theme: { fonts } }) => fonts.korean.emphasis};
    font-weight: 700;
  }
  > div {
    width: 70%;
  }
`;
export const EmptyImage = styled.div`
  background-color: ${({ theme: { colors } }) => colors.greyScale.background};
  width: 100%;
  height: 100%;
  border-radius: 20px 20px 0px 0px;
  ${({ theme: { mixin } }) => mixin.flexCenter({})};
`;
export const UserImg = css`
  position: relative;
  width: 3%;
  height: 100%;
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

export const View = styled.div`
  width: 25px;
  height: 25px;
  > path {
    stroke: ${({ theme: { colors } }) => colors.primary.normal};
    fill: ${({ theme: { colors } }) => colors.primary.normal};
  }
`;

export const Chat = styled.div`
  width: 25px;
  height: 25px;
  & path {
    stroke: ${({ theme: { colors } }) => colors.primary.normal};
    fill: ${({ theme: { colors } }) => colors.primary.normal};
  }
`;
