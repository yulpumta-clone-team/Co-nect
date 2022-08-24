import React from 'react';
import { skillStack } from 'constant';
import SelectInput from 'components/Common/SelectInput';
import Button from 'components/Common/Button';
import {
  useEssentialFormsAction,
  useEssentialFormsState,
} from 'contexts/EssentialForm/EssentialForm.Provider';
import { skillStackParserToSelectInput } from 'service/skillStack.parser';
import * as S from '../EssentialInfo.style';

export default function Skills() {
  const { inputValues, validateError } = useEssentialFormsState();
  const { onChangeHandlerWithSelect, isTargetSatisfyValidate, handleClickNextButton } =
    useEssentialFormsAction();
  const isSkillsValidateError = isTargetSatisfyValidate('skills');

  const parsedSkillStack = skillStackParserToSelectInput(skillStack);

  return (
    <S.Content>
      <h2>가능한 기술들을 선택해주세요.</h2>
      <S.InputContainer>
        <SelectInput
          isMulti
          name="skills"
          label="기술"
          options={parsedSkillStack}
          value={inputValues.skills}
          onChange={onChangeHandlerWithSelect}
          isError={isSkillsValidateError}
          helperText={validateError.skills}
        />
      </S.InputContainer>
      <S.NextButtonContainer>
        <Button
          theme="primary"
          type="submit"
          disabled={isSkillsValidateError}
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
