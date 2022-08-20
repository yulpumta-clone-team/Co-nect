import React from 'react';
import { hopeSessionOption, jobOptions } from 'constant';
import Button from 'components/Common/Button';
import SelectInput from 'components/Common/SelectInput';
import * as S from '../EssentialInfo.style';

SessionJob.propTypes = {};

export default function SessionJob({}) {
  return (
    <S.Content>
      <h2>직업과 희망 기간을 선택해주세요.</h2>
      <S.InputContainer>
        <SelectInput
          label="회망 기간"
          defaultOption={hopeSessionOption[0]}
          options={hopeSessionOption}
        />
        <SelectInput label="직업" defaultOption={jobOptions[0]} options={jobOptions} />
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
