import styled from 'styled-components';

export const temp = styled.div``;

export const Board = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  width: 600px;
  margin: 0 auto;
  padding: 15px;
  border: 3px solid #ffdf65;
  border-radius: 15px;
  box-shadow: 2px 2px 2px 2px gray;
  flex-wrap: wrap;
`;

export const Box = styled.ul`
  display: flex;
  width: 200px;
  padding: 15px;
  border: 3px solid #ffdf65;
  border-radius: 15px;
  box-shadow: 2px 2px 2px 2px gray;
  float: middle;
`;

export const Box2 = styled.ul`
  display: flex;
  width: 200px;
  padding: 15px;
  border-radius: 15px;
  float: right;
`;

export const Box3 = styled.ul`
  display: flex;
  width: 200px;
  padding: 15px;
  border: 3px solid #ffdf65;
  border-radius: 15px;
  float: right;
`;
