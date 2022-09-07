import styled, { css } from 'styled-components';
import { ReactComponent as blueHeartIcon } from 'assets/icons/blue-heart.svg';
import { ReactComponent as chatIcon } from 'assets/icons/chat.svg';
import { ReactComponent as viewIcon } from 'assets/icons/view.svg';

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
  height: 12%;
  border-radius: 20px 20px 0px 0px;
  background-color: ${({ theme: { colors } }) => colors.greyScale.background};
`;
export const ViewingImage = styled.img`
  background-color: ${({ theme: { colors } }) => colors.greyScale.background};
  width: 100%;
  height: 100%;
  border-radius: 20px 20px 0px 0px;
  ${({ theme: { mixin } }) => mixin.flexCenter({})};
`;
export const TeamInfoContainer = styled.div`
  padding: 20px 55px 50px 55px;
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
export const Heart = styled(blueHeartIcon)`
  color: ${({ theme: { colors } }) => colors.primary.normal};
  width: 25px;
  height: 25px;
`;
export const Chat = styled(chatIcon)`
  width: 25px;
  height: 25px;
`;
export const View = styled(viewIcon)`
  width: 25px;
  height: 25px;
`;
