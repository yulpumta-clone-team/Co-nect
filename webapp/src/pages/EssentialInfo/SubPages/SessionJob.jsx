import React from 'react';
import { hopeSessionOption, jobOptions } from 'constant';
import Button from 'components/Common/Button';
import SelectInput from 'components/Common/SelectInput';
import {
  useEssentialFormsAction,
  useEssentialFormsState,
} from 'contexts/EssentialForm/EssentialForm.Provider';
import * as S from '../EssentialInfo.style';

export default function SessionJob() {
  const { inputValues } = useEssentialFormsState();
  const { onChangeHandlerWithSelect, handleClickNextButton } = useEssentialFormsAction();

  return (
    <S.Content>
      <h2>직업과 희망 기간을 선택해주세요.</h2>
      <S.InputContainer>
        <SelectInput
          name="hopeSession"
          placeHolder="회망 기간"
          defaultOption={hopeSessionOption[0]}
          options={hopeSessionOption}
          value={inputValues.hopeSession}
          onChange={onChangeHandlerWithSelect}
        />
        <SelectInput
          name="job"
          placeHolder="직업"
          defaultOption={jobOptions[0]}
          options={jobOptions}
          value={inputValues.job}
          onChange={onChangeHandlerWithSelect}
        />
      </S.InputContainer>
      <S.NextButtonContainer>
        <Button theme="primary" customStyle={S.NextButton} onClick={handleClickNextButton}>
          다음
        </Button>
        <span>직업과 희망 기간 선택 없이 가입을 원할 경우 다음을 눌러주세요.</span>
      </S.NextButtonContainer>
    </S.Content>
  );
}
