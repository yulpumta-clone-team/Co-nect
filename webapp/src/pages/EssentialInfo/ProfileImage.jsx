import React from 'react';
import Button from 'components/Common/Button';
import * as S from './EssentialInfo.style';

ProfileImage.propTypes = {};

export default function ProfileImage({}) {
  return (
    <S.Content>
      <h2>프로필 이미지를 골라주세요.</h2>
      <S.InputTypeImage type="file" />
      <S.NextButtonContainer>
        <Button theme="primary" type="submit" disabled={false} customStyle={S.NextButton}>
          다음
        </Button>
        <span>필수 입력 항목입니다.</span>
      </S.NextButtonContainer>
    </S.Content>
  );
}
