import React from 'react';
import TextInput from 'components/Common/TextInput';
import Button from 'components/Common/Button';
import {
  useEssentialFormsAction,
  useEssentialFormsState,
} from 'contexts/EssentialForm/EssentialForm.Provider';
import { useNavigate } from 'react-router-dom';
import { ESSENTIAL_INFO } from 'constant/route.constant';
import * as S from '../EssentialInfo.style';

export default function Nickname() {
  const navigate = useNavigate();
  const { inputValues, validateError, isNicknameDuplicate } = useEssentialFormsState();
  const { onChangeHandler, onClickCheckDuplicateNickname, isTargetSatisfyValidate } =
    useEssentialFormsAction();
  const isNicknameValidateError = isTargetSatisfyValidate('nickname');
  const canActiveNextButton = isNicknameValidateError || isNicknameDuplicate;
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
            onClick={onClickCheckDuplicateNickname}
          >
            중복확인
          </Button>
        </S.DuplicateCheckInput>
      </S.InputContainer>
      <S.NextButtonContainer>
        <Button
          theme="primary"
          type="submit"
          disabled={canActiveNextButton}
          customStyle={S.NextButton}
          onClick={() => {
            navigate(ESSENTIAL_INFO.INDEX + ESSENTIAL_INFO.SKILL);
          }}
        >
          다음
        </Button>
        <span>필수 입력 항목입니다.</span>
      </S.NextButtonContainer>
    </S.Content>
  );
}
