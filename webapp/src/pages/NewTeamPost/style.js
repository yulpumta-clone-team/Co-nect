import styled from 'styled-components';

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
  height: 10%;
  border: 20px 20px 0px 0px;
  background-color: ${({ theme: { colors } }) => colors.greyScale.background};
`;
export const ViewingImage = styled.img`
  width: 10%;
  height: 20%;
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
`;

export const TechStack = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
export const HopeSession = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
export const Slogan = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
