import React from 'react';
import Spinner from 'components/Common/Loader/Spinner';
import * as S from '../EssentialInfo.style';

// TODO: 특정시간동안 반응없으면 essential-info로 이동시키기
export default function EssentailCallback() {
  return (
    <S.Content>
      <S.InputContainer>
        <Spinner withLogo />
      </S.InputContainer>
    </S.Content>
  );
}
