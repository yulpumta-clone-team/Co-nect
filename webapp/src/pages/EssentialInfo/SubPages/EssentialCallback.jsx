import React from 'react';
import Loader from 'components/Common/Loader';
import * as S from '../EssentialInfo.style';

export default function EssentailCallback() {
  return (
    <S.Content>
      <h2>Loading....</h2>
      <S.InputContainer>
        <Loader />
      </S.InputContainer>
    </S.Content>
  );
}
