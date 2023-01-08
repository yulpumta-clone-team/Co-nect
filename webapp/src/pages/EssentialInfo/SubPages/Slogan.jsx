import React from 'react';
import TextInput from 'components/Common/TextInput';
import Button from 'components/Common/Button';
import {
  useEssentialFormsAction,
  useEssentialFormsState,
} from 'contexts/EssentialForm/EssentialForm.Provider';
import * as S from '../EssentialInfo.style';

export default function Slogan() {
  const { inputValues, validateError } = useEssentialFormsState();
  const { onChangeHandler, isTargetSatisfyValidate, handleClickNextButton } =
    useEssentialFormsAction();
  const isSloganValidateError = isTargetSatisfyValidate('slogan'); // 에러가 있으면 true
  const canActiveNextButton = Boolean(!inputValues.slogan) || isSloganValidateError;
  return (
    <S.Content>
      <h2>슬로건을 입력해주세요.</h2>
      <S.InputContainer>
        <TextInput
          name="slogan"
          placeholder="슬로건"
          value={inputValues.slogan}
          onChange={onChangeHandler}
          isError={isSloganValidateError}
          helperText={validateError.slogan}
        />
      </S.InputContainer>
      <S.NextButtonContainer>
        <Button
          theme="primary"
          disabled={canActiveNextButton}
          customStyle={S.NextButton}
          onClick={handleClickNextButton}
        >
          다음
        </Button>
        <span>필수 입력 항목입니다.</span>
      </S.NextButtonContainer>
    </S.Content>
  );
}
