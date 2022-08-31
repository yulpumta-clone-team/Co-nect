import React from 'react';
import { skillStack } from 'constant';
import Button from 'components/Common/Button';
import {
  useEssentialFormsAction,
  useEssentialFormsState,
} from 'contexts/EssentialForm/EssentialForm.Provider';
import TechStackSelectInput from 'components/TechStackSelectInput';
import { skillStackParser } from 'service/skillStack.parser';
import * as S from '../EssentialInfo.style';

export default function Skills() {
  const { inputValues, validateError } = useEssentialFormsState();
  const { onChangeHandlerWithSelect, isTargetSatisfyValidate, handleClickNextButton } =
    useEssentialFormsAction();
  const isSkillsValidateError = isTargetSatisfyValidate('techSkills');

  const parsedSkillStack = skillStackParser(skillStack);

  return (
    <S.Content>
      <h2>가능한 기술들을 선택해주세요.</h2>
      <S.InputContainer>
        <TechStackSelectInput
          name="techSkills"
          placeholder="기술"
          selectedTechSkills={inputValues.techSkills}
          techSkillOptions={parsedSkillStack}
          onChange={onChangeHandlerWithSelect}
          isError={isSkillsValidateError}
          helperText={validateError.techSkills}
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
