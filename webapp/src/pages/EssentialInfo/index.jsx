import React from 'react';
import { Outlet } from 'react-router-dom';
import Button from 'components/Common/Button';
import WithProvider from 'hoc/withProvider';
import EssentialFormProvider, {
  useEssentialFormsAction,
} from 'contexts/EssentialForm/EssentialForm.Provider';
import * as S from './EssentialInfo.style';

export default WithProvider({ Provider: EssentialFormProvider, Component: EssentialInfo });

function EssentialInfo() {
  const { handleClickNextButton, handleClickPrevButton } = useEssentialFormsAction();

  return (
    <S.Layout>
      <S.DialogContainer>
        <Button theme="none" customStyle={S.CloseButton}>
          <S.CloseLarge />
        </Button>
        <S.AngleContainer>
          <Button theme="none" customStyle={S.AngleButton} onClick={handleClickPrevButton}>
            <S.LeftAngle />
          </Button>
          <Button theme="none" customStyle={S.AngleButton} onClick={handleClickNextButton}>
            <S.RightAngle />
          </Button>
        </S.AngleContainer>
        {/* Outlet === subPage  */}
        <Outlet />
      </S.DialogContainer>
    </S.Layout>
  );
}
