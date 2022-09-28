import React from 'react';
import Button from 'components/Common/Button';
import {
  useEssentialFormsAction,
  useEssentialFormsState,
} from 'contexts/EssentialForm/EssentialForm.Provider';
import TechStackSelectInput from 'components/TechStackSelectInput';
import * as S from '../EssentialInfo.style';

export default function Skills() {
  const { inputValues, validateError } = useEssentialFormsState();
  const { onChangeHandlerWithSelect, isTargetSatisfyValidate, handleClickNextButton } =
    useEssentialFormsAction();
  const isSkillsValidateError = isTargetSatisfyValidate('techSkills');

  return (
    <S.Content>
      <h2>가능한 기술들을 선택해주세요.</h2>
      <S.TechSkillContainer>
        <TechStackSelectInput
          name="techSkills"
          placeholder="기술"
          selectedTechSkills={inputValues.techSkills}
          onChange={onChangeHandlerWithSelect}
          isError={isSkillsValidateError}
          helperText={validateError.techSkills}
          isDropdownType={false}
        />
      </S.TechSkillContainer>
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
