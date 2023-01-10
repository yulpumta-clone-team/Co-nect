import React from 'react';
import TextInput from 'components/Common/TextInput';
import Button from 'components/Common/Button';
import {
  useEssentialFormsAction,
  useEssentialFormsState,
} from 'contexts/EssentialForm/EssentialForm.Provider';
import * as S from '../EssentialInfo.style';

export default function Nickname() {
  const { inputValues, validateError, isNicknameDuplicate } = useEssentialFormsState();
  const {
    onChangeHandler,
    onClickCheckDuplicateNickname,
    isTargetSatisfyValidate,
    handleClickNextButton,
  } = useEssentialFormsAction();
  const isNicknameValidateError = isTargetSatisfyValidate('nickname'); // 에러가 있으면 true
  const canActiveNextButton =
    Boolean(!inputValues.nickname) || isNicknameValidateError || isNicknameDuplicate; // true -> disable
  return (
    <S.Content>
      <h2>닉네임을 입력해주세요.</h2>
      <S.InputContainer>
        <S.DuplicateCheckInput>
          <TextInput
            name="nickname"
            placeholder="닉네임"
            value={inputValues.nickname}
            onChange={onChangeHandler}
            isError={isNicknameValidateError}
            helperText={validateError.nickname}
          />
          <Button
            theme="secondary"
            customStyle={S.DuplicateCheckButton}
            disabled={isNicknameValidateError}
            onClick={() => onClickCheckDuplicateNickname(inputValues.nickname)}
          >
            중복확인
          </Button>
        </S.DuplicateCheckInput>
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
