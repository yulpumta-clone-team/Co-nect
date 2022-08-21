import React from 'react';
import Button from 'components/Common/Button';
import TextArea from 'components/Common/TextArea';
import {
  useEssentialFormsAction,
  useEssentialFormsState,
} from 'contexts/EssentialForm/EssentialForm.Provider';
import * as S from '../EssentialInfo.style';

// FIXME: 사용자가 어려 줄 입력했을 때 스타일 어떻게 처리할 것인지 결정해서 반영해야된다. 현재 여러 줄 입력하면 다음 버튼 아래로 넘어간다.
export default function Introduction() {
  const { inputValues } = useEssentialFormsState();
  const { onChangeHandler, handleClickNextButton } = useEssentialFormsAction();
  return (
    <S.Content>
      <h2>자기소개를 입력해주세요.</h2>
      <S.InputContainer>
        <TextArea
          name="introduction"
          placeholder="자기소개"
          value={inputValues.introduction}
          onChange={onChangeHandler}
        />
      </S.InputContainer>
      <S.NextButtonContainer>
        <Button theme="primary" customStyle={S.NextButton} onClick={handleClickNextButton}>
          다음
        </Button>
        <span>자기소개 작성 없이 가입을 원할 경우 다음을 눌러주세요.</span>
      </S.NextButtonContainer>
    </S.Content>
  );
}
