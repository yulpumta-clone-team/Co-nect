import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  > h2 {
    font-family: 'Sandoll GothicNeo1';
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 28px;
    /* identical to box height, or 70% */

    /* Color/Primary/900 */
    color: #036eff;
  }
  > span {
    font-family: 'Sandoll GothicNeo1';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;
    /* identical to box height, or 133% */

    /* Color/Gray/700 */
    color: #818181;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
`;

export const Backdrop = styled.div``;
