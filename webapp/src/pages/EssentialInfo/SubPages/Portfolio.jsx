import React from 'react';
import TextInput from 'components/Common/TextInput';
import Button from 'components/Common/Button';
import {
  useEssentialFormsAction,
  useEssentialFormsState,
} from 'contexts/EssentialForm/EssentialForm.Provider';
import * as S from '../EssentialInfo.style';

export default function Portfolio() {
  const { inputValues } = useEssentialFormsState();
  const { onChangeHandler, handleClickNextButton } = useEssentialFormsAction();
  return (
    <S.Content>
      <h2>포트폴리오를 업로드해주세요.</h2>
      <S.InputContainer>
        <TextInput
          name="portfolio"
          placeholder="포트폴리오(url)"
          value={inputValues.portfolio}
          onChange={onChangeHandler}
        />
      </S.InputContainer>
      <S.NextButtonContainer>
        <Button theme="primary" customStyle={S.NextButton} onClick={handleClickNextButton}>
          가입!
        </Button>
        <span>포트폴리오 작업 없이 가입을 원할 경우 다음을 눌러주세요.</span>
      </S.NextButtonContainer>
    </S.Content>
  );
}
