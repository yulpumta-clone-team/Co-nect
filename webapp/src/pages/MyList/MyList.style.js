import styled from 'styled-components/macro';

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-top: 110px; // SessionContainer높이 + padding
`;

export const SessionContainer = styled.div`
  position: absolute;
  top: 70px;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100vw;
  padding: 16px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
`;
