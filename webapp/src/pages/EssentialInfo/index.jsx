import React from 'react';
import Button from 'components/Common/Button';
import WithProvider from 'hoc/withProvider';
import EssentialFormProvider, {
  useEssentialFormsAction,
  useEssentialFormsState,
} from 'contexts/EssentialForm/EssentialForm.Provider';
import { Outlet } from 'react-router-dom';
import XMarkSvg from 'assets/icons/XMarkSvg';
import ChevronLeftSvg from 'assets/icons/ChevronLeftSvg';
import * as S from './EssentialInfo.style';

export default WithProvider({ Providers: [EssentialFormProvider], Component: EssentialInfo });

function EssentialInfo() {
  const { handleClickPrevButton, handleClickLayout, closeEssentialModal } =
    useEssentialFormsAction();
  const { layoutRef } = useEssentialFormsState();
  return (
    <S.Layout ref={layoutRef} onClick={handleClickLayout}>
      <S.DialogContainer>
        <Button theme="none" customStyle={S.CloseButton} onClick={closeEssentialModal}>
          <XMarkSvg />
        </Button>
        <S.AngleContainer>
          <Button theme="none" customStyle={S.AngleButton} onClick={handleClickPrevButton}>
            <ChevronLeftSvg />
          </Button>
        </S.AngleContainer>
        {/* Outlet === subPage  */}
        <Outlet />
      </S.DialogContainer>
    </S.Layout>
  );
}
