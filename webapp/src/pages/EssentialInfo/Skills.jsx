import React from 'react';
import { skillOptions } from 'constant';
import SelectInput from 'components/Common/SelectInput';
import Button from 'components/Common/Button';
import * as S from './EssentialInfo.style';

Skills.propTypes = {};

export default function Skills({}) {
  return (
    <S.Content>
      <h2>가능한 기술들을 선택해주세요.</h2>
      <S.InputContainer>
        <SelectInput label="기술" defaultOption={skillOptions[0]} options={skillOptions} />
      </S.InputContainer>
      <S.NextButtonContainer>
        <Button theme="primary" type="submit" disabled={false} customStyle={S.NextButton}>
          다음
        </Button>
        <span>필수 입력 항목입니다.</span>
      </S.NextButtonContainer>
    </S.Content>
  );
}
