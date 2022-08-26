import React, { useEffect } from 'react';
import Loader from 'components/Common/Loader';
import { useEssentialFormsAction } from 'contexts/EssentialForm/EssentialForm.Provider';
import * as S from '../EssentialInfo.style';

export default function EssentailCallback() {
  const { submitHandler } = useEssentialFormsAction();

  useEffect(() => {
    submitHandler();
  }, []);

  return (
    <S.Content>
      <h2>Loading....</h2>
      <S.InputContainer>
        <Loader />
      </S.InputContainer>
    </S.Content>
  );
}
