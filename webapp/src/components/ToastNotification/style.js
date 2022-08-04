// ref: https://github.com/uzochukwueddie/react-toast/blob/master/src/components/toast/Toast.css
import styled, { css } from 'styled-components';

export const Container = styled.div`
  font-size: 14px;
  box-sizing: border-box;
  position: fixed;
  z-index: 999999;
  ${({ positionType }) => alertPosition[positionType]};
`;

export const Notification = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  box-sizing: border-box;
  position: relative;
  pointer-events: auto;
  overflow: hidden;
  margin: 0 0 15px 6px;
  padding: 12px;
  width: 300px;
  border-radius: 3px 3px 3px 3px;
  box-shadow: 0 0 10px #999;
  background-position: 15px;
  background-repeat: no-repeat;
  background-color: ${({ type }) => backgroundColor[type]};
  color: #fff;
  ${({ positionType }) => alertPosition[positionType]};
  animation: ${({ startPoint }) => `toast-in-${startPoint} 0.7s`};
  transition: transform 0.6s ease-in-out;

  &:hover {
    box-shadow: 0 0 12px #fff;
    opacity: 0.9;
    cursor: pointer;
  }

  @keyframes toast-in-right {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes toast-in-left {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  & > button {
    position: absolute;
    right: 1em;
    top: 1em;
  }
`;

export const Image = styled.div`
  float: left;
  margin-right: 15px;
  width: 30px;
  height: 30px;
  > img {
    width: 100%;
    height: 100%;
  }
`;

export const Info = styled.div`
  > h3 {
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 4px;
  }
  > p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const backgroundColor = {
  Success: '#5cb85c',
  Error: '#d9534f',
  Warning: '#f0ad4e',
  Info: '#5bc0de',
};

const alertPosition = {
  'top-right': css`
    top: 12px;
    right: 12px;
  `,
  'top-left': css`
    top: 12px;
    left: 12px;
  `,
  'bottom-right': css`
    bottom: 12px;
    right: 12px;
  `,
  'bottom-left': css`
    bottom: 12px;
    left: 12px;
  `,
};
