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
  const { inputValues, validateError } = useEssentialFormsState();
  const { onChangeHandlerWithSelect, isTargetSatisfyValidate, handleClickNextButton } =
    useEssentialFormsAction();
  const isHopeSesstionValidateError = isTargetSatisfyValidate('hopeSession');
  const isJobValidateError = isTargetSatisfyValidate('job');
  const canActiveNextButton = isHopeSesstionValidateError || isJobValidateError;
  return (
    <S.Content>
      <h2>직업과 희망 기간을 선택해주세요.</h2>
      <S.InputContainer>
        <SelectInput
          name="hopeSession"
          label="회망 기간"
          defaultOption={hopeSessionOption[0]}
          options={hopeSessionOption}
          value={inputValues.hopeSession}
          onChange={onChangeHandlerWithSelect}
          isError={isHopeSesstionValidateError}
          helperText={validateError.hopeSession}
        />
        <SelectInput
          name="job"
          label="직업"
          defaultOption={jobOptions[0]}
          options={jobOptions}
          value={inputValues.job}
          onChange={onChangeHandlerWithSelect}
          isError={isJobValidateError}
          helperText={validateError.job}
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
