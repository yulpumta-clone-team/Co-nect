import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
`;
export const Image = styled.div``;

export const Info = styled.div``;

export const EditForm = styled.form``;

export const LikeThumbStyled = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid black;
  background-color: ${({ isFill }) => (isFill ? '#ff7600' : '#fff')};
  margin-right: 10px;
  &:hover {
    cursor: pointer;
  }
`;

export const Buttons = styled.div``;
