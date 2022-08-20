import React from 'react';
import TextInput from 'components/Common/TextInput';
import Button from 'components/Common/Button';
import * as S from '../EssentialInfo.style';

Nickname.propTypes = {};

export default function Nickname({}) {
  return (
    <S.Content>
      <h2>닉네임을 입력해주세요.</h2>
      <S.InputContainer>
        <S.DuplicateCheckInput>
          <TextInput
            name="nickname"
            placeholder="닉네임"
            value=""
            onChange={() => {}}
            isError={false}
            helperText=""
          />
          <Button theme="secondary" customStyle={S.DuplicateCheckButton} onClick={() => {}}>
            중복확인
          </Button>
        </S.DuplicateCheckInput>
      </S.InputContainer>
      <S.NextButtonContainer>
        <Button theme="primary" type="submit" disabled={false} customStyle={S.NextButton}>
          다음
        </Button>
        <span>필수 입력 항목입니다.</span>
      </S.NextButtonContainer>
    </S.Content>
  );
}
