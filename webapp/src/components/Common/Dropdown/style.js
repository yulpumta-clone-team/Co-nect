import styled, { css } from 'styled-components/macro';

export const defaultStyle = {
  overlay: css`
    display: flex;
    flex-direction: column;
    position: absolute;
    border-radius: 16px;
    border: 1px solid #d9dbe9;
    z-index: 99;
  `,
  content: css`
    display: flex;
    align-items: center;
    padding: 8px 16px;
    gap: 8px;

    width: 240px;
    height: 100px;

    background-color: #fefefe;
    border: 1px solid #d9dbe9;
  `,
  button: css`
    position: absolute;
    right: 10px;
    top: 6px;
    background: transparent;
    border: none;
    z-index: 512;
    font-size: 12px;
    cursor: pointer;
  `,
};

export const Overlay = styled.div`
  ${defaultStyle.overlay};
  ${({ customStyle }) =>
    customStyle &&
    css`
      ${customStyle};
    `}
`;

export const Content = styled.div`
  ${defaultStyle.content}
  ${({ customStyle }) =>
    customStyle &&
    css`
      ${customStyle};
    `}
`;

export const CloseButton = styled.button`
  ${defaultStyle.button}
  ${({ customStyle }) =>
    customStyle &&
    css`
      ${customStyle};
    `}
`;
