import styled from 'styled-components';

export const Board = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  margin: 0 auto;
  padding: 15px;
  border: 3px solid #ffdf65;
  border-radius: 15px;
  box-shadow: 2px 2px 2px 2px gray;
  flex-wrap: wrap;
`;

export const Button = styled.button`
  background-color: #ffdf65;
  color: white;
  font-size: 10px;
  padding: 7px 14px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;
