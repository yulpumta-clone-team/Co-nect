import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;

  position: absolute;
  border-radius: 16px;
  border: 1px solid #d9dbe9;
  ${({ customStyle }) =>
    customStyle &&
    css`
      ${customStyle};
    `}
`;

export const Layout = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  gap: 8px;

  width: 240px;
  height: 100px;

  background-color: #fefefe;
  border: 1px solid #d9dbe9;
  ${({ customStyle }) =>
    customStyle &&
    css`
      ${customStyle};
    `}
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 6px;
  background: transparent;
  border: none;
  z-index: 512;
  font-size: 12px;
  cursor: pointer;
  ${({ customStyle }) =>
    customStyle &&
    css`
      ${customStyle};
    `}
`;
