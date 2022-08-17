import React from 'react';
import TextInput from 'components/Common/TextInput';
import Button from 'components/Common/Button';
import * as S from './EssentialInfo.style';

ProfileImage.propTypes = {};

export default function ProfileImage({}) {
  return (
    <S.Content>
      <h2>프로필 이미지를 골라주세요.</h2>
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
      <S.NextButtonContainer>
        <Button theme="primary" type="submit" disabled={false} customStyle={S.NextButton}>
          다음
        </Button>
        <span>필수 입력 항목입니다.</span>
      </S.NextButtonContainer>
    </S.Content>
  );
}
