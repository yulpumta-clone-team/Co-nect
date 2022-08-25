import React from 'react';
import Button from 'components/Common/Button';
import WithProvider from 'hoc/withProvider';
import EssentialFormProvider, {
  useEssentialFormsAction,
} from 'contexts/EssentialForm/EssentialForm.Provider';
import { Outlet } from 'react-router-dom';
import * as S from './EssentialInfo.style';

export default WithProvider({ Providers: [EssentialFormProvider], Component: EssentialInfo });

function EssentialInfo() {
  const { handleClickNextButton, handleClickPrevButton, handleClickLayout } =
    useEssentialFormsAction();
  return (
    <S.Layout onClick={handleClickLayout}>
      <S.DialogContainer onClick={(event) => event.stopPropagation()}>
        <Button theme="none" customStyle={S.CloseButton} onClick={handleClickLayout}>
          <S.CloseLarge />
        </Button>
        <S.AngleContainer>
          <Button theme="none" customStyle={S.AngleButton} onClick={handleClickPrevButton}>
            <S.LeftAngle />
          </Button>
          {/* <Button theme="none" customStyle={S.AngleButton} onClick={handleClickNextButton}>
            <S.RightAngle />
          </Button> */}
        </S.AngleContainer>
        {/* Outlet === subPage  */}
        <Outlet />
      </S.DialogContainer>
    </S.Layout>
  );
}
