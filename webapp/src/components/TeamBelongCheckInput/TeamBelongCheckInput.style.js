import styled from 'styled-components/macro';

export const Container = styled.div``;

export const Label = styled.label`
  width: 100%;
  color: ${({ theme }) => theme.colors.primary.normal};
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  display: inline-block;
  margin-bottom: 10px;
`;

export const CheckBoxContainer = styled.div`
  display: flex;
  gap: 11px;
`;

export const CheckBox = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  > span {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #c2c2c2;
  }
`;

export const CheckButton = styled.button`
  cursor: ${({ onlyDisplay }) => (onlyDisplay ? 'default' : 'pointer')};
  width: ${({ buttonSize }) => buttonSize || '39px'};
  height: ${({ buttonSize }) => buttonSize || '39px'};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ isActive }) => (isActive ? '#FFBC39' : '#C2C2C2')}; // /* Color/Secondary/900 */  /* Color/Gray/500 */
  background-color: ${({ isActive }) => isActive && '#FFEBC4'}; /* Color/Secondary/300 */
`;

export const CheckCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ buttonSize }) => buttonSize.replace(/[^0-9]/g, '') * 0.5}px;
  height: ${({ buttonSize }) => buttonSize.replace(/[^0-9]/g, '') * 0.5}px;
  border-radius: 50%;
  background-color: #ffbc39;
`;

export const CloseCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ buttonSize }) => buttonSize.replace(/[^0-9]/g, '') * 0.5}px;
  height: ${({ buttonSize }) => buttonSize.replace(/[^0-9]/g, '') * 0.5}px;
  border-radius: 50%;
  background-color: #d9d9d9;
`;
