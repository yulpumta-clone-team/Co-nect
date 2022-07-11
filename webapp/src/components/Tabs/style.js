import styled from 'styled-components';

export const Tabs = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 12px;
`;

export const Tab = styled.li`
  border-bottom: ${({ isActive }) => isActive && '5px solid black'};
  cursor: pointer;
`;
