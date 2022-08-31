import styled, { css } from 'styled-components';
import { ReactComponent as addImg } from 'assets/icons/add-img.svg';

export const PageContainer = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80%;
`;
export const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 14%;
  border: 20px 20px 0px 0px;
  background-color: ${({ theme: { colors } }) => colors.greyScale.background};
`;
export const AddImage = styled(addImg)`
  width: 50px;
  height: 50px;
  input[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;
export const ViewingImage = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 14%;
  border: 20px 20px 0px 0px;
`;

export const Container = styled.div`
  width: 750px;
  height: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* Color/Primary/900 */

  border: 3px solid ${({ theme: { colors } }) => colors.primary.normal};
  border-radius: 20px;
  color: ${({ theme: { colors } }) => colors.primary.normal};

  ${({ theme: { fonts } }) => fonts.korean.emphasis};
  font-weight: 700;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5%;
  width: 100%;
  height: 100%;
  padding: 3rem 5rem;
`;

export const TeamName = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 8%;
`;

export const TechStack = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 8%;
`;
export const HopeSession = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 8%;
`;
export const Slogan = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 8%;
`;
export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 8%;
`;
export const PostInput = css``;
export const SubmitButton = css`
  display: flex;
  justify-content: center;
  width: 220px;
  height: 55px;
  margin-top: 5%;
  left: 50px;
`;
