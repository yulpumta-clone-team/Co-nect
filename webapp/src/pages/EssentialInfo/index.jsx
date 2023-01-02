import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Common/Button';
import WithProvider from 'hoc/withProvider';
import EssentialFormProvider, {
  useEssentialFormsAction,
  useEssentialFormsState,
} from 'contexts/EssentialForm/EssentialForm.Provider';
import XMarkSvg from 'assets/icons/XMarkSvg';
import ChevronLeftSvg from 'assets/icons/ChevronLeftSvg';
import * as S from './EssentialInfo.style';

export default WithProvider({ Providers: [EssentialFormProvider], Component: EssentialInfo });

EssentialInfo.propTypes = {
  children: PropTypes.element.isRequired,
};

function EssentialInfo({ children }) {
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
        {children}
      </S.DialogContainer>
    </S.Layout>
  );
}
