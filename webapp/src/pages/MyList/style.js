import styled from 'styled-components';

export const Container = styled.div``;

export const SessionContainer = styled.div`
  display: flex;
  align-items: center;
  width: 1500px;
  height: 70px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
`;

export const BoardContainer = styled.div`
  width: 1180px; // SessionContainer 때문에 layouts에서 width값을 정해줬지만 여기서 별도로 정해줘야합니다.
  margin: 0 auto;
  padding: 30px;
`;
