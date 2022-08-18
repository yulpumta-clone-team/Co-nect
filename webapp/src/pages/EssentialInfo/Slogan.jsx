import React from 'react';
import TextInput from 'components/Common/TextInput';
import Button from 'components/Common/Button';
import * as S from './EssentialInfo.style';

Slogan.propTypes = {};

export default function Slogan({}) {
  return (
    <S.Content>
      <h2>슬로건을 입력해주세요.</h2>
      <S.SelectInputContainer>
        <TextInput
          name="nickname"
          placeholder="슬로건"
          value=""
          onChange={() => {}}
          isError={false}
          helperText=""
        />
      </S.SelectInputContainer>
      <S.NextButtonContainer>
        <Button theme="primary" type="submit" disabled={false} customStyle={S.NextButton}>
          다음
        </Button>
        <span>필수 입력 항목입니다.</span>
      </S.NextButtonContainer>
    </S.Content>
  );
}
