import styled from 'styled-components/macro';

export const Tabs = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 50px;
`;
export const Tab = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 30px;
  border: 2px solid ${({ theme: { colors } }) => colors.primary.normal};
  border-radius: 5px;
  background-color: ${({ isActive }) =>
    isActive ? ({ theme: { colors } }) => colors.primary.normal : 'white'};
  color: ${({ isActive }) =>
    isActive ? 'white' : ({ theme: { colors } }) => colors.primary.normal};
  ${({ theme: { fonts } }) => fonts.korean.title};
  font-size: 16px;

  cursor: pointer;
`;
