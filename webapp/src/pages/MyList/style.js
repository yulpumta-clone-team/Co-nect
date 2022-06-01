import styled from 'styled-components';

export const Container = styled.div``;

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

export const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  width: 720px;
  margin: 0 auto;
`;

export const SessionContainer = styled.div``;
