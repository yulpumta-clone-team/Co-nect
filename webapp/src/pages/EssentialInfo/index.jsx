import React from 'react';
import Button from 'components/Common/Button';
import WithProvider from 'hoc/withProvider';
import EssentialFormProvider, {
  useEssentialFormsAction,
  useEssentialFormsState,
} from 'contexts/EssentialForm/EssentialForm.Provider';
import { Outlet, useLocation } from 'react-router-dom';
import * as S from './EssentialInfo.style';

export default WithProvider({ Providers: [EssentialFormProvider], Component: EssentialInfo });

function EssentialInfo() {
  // const location = useLocation();
  // console.log(location);
  const { handleClickPrevButton, handleClickLayout, closeEssentialModal } =
    useEssentialFormsAction();
  const { layoutRef } = useEssentialFormsState();
  return (
    <S.Layout ref={layoutRef} onClick={handleClickLayout}>
      <S.DialogContainer>
        <Button theme="none" customStyle={S.CloseButton} onClick={closeEssentialModal}>
          <S.CloseLarge />
        </Button>
        <S.AngleContainer>
          <Button theme="none" customStyle={S.AngleButton} onClick={handleClickPrevButton}>
            <S.LeftAngle />
          </Button>
        </S.AngleContainer>
        {/* Outlet === subPage  */}
        <Outlet />
      </S.DialogContainer>
    </S.Layout>
  );
}
