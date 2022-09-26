import styled, { css } from 'styled-components';
import { ReactComponent as CheckRectangeIcon } from 'assets/icons/check-rectangle.svg';
import { ReactComponent as RectangeIcon } from 'assets/icons/rectangle.svg';

export const Container = styled.div`
  display: flex;
  gap: 11px;
  align-items: center;
  && {
    ${({ customStyle }) => customStyle}
  }
`;

export const CheckRectangeSvg = styled(CheckRectangeIcon)`
  width: 20px;
  height: 20px;
`;

export const RectangeSvg = styled(RectangeIcon)`
  width: 20px;
  height: 20px;
`;
