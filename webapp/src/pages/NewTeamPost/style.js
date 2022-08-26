import styled from 'styled-components';

export const Container = styled.div`
  width: 750px;
  height: 900px;
  display: flex;
  flex-direction: column;

  /* Color/Primary/900 */

  border: 3px solid ${({ theme: { colors } }) => colors.primary.normal};
  border-radius: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  width: 450px;
`;

export const TeamName = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme: { fonts } }) => fonts.korean.emphasis};
`;
