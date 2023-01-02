import React from 'react';
import Button from 'components/Common/Button';
import TeamBelongCheckInput from 'components/TeamBelongCheckInput';
import {
  useEssentialFormsAction,
  useEssentialFormsState,
} from 'contexts/EssentialForm/EssentialForm.Provider';
import * as S from '../EssentialInfo.style';

export default function BelongTeam() {
  const { inputValues } = useEssentialFormsState();
  const { onChangeHandlerWithSelect, handleClickNextButton } = useEssentialFormsAction();
  return (
    <S.Content>
      <h2>팀 소속 여부를 알려주세요.</h2>
      <S.InputContainer>
        <TeamBelongCheckInput
          name="belongTeam"
          value={inputValues.belongTeam}
          onChange={onChangeHandlerWithSelect}
        />
      </S.InputContainer>
      <S.NextButtonContainer>
        <Button theme="primary" customStyle={S.NextButton} onClick={handleClickNextButton}>
          다음
        </Button>
        <span>팀 소속 여부 선택 없이 가입을 원할 경우 다음을 눌러주세요.</span>
      </S.NextButtonContainer>
    </S.Content>
  );
}
