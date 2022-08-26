import React from 'react';
import Loader from 'components/Common/Loader';

import * as S from '../EssentialInfo.style';

// TODO: 특정시간동안 반응없으면 essential-info로 이동시키기
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
