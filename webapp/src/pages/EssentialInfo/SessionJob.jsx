import React from 'react';
import { hopeSessionOption, jobOptions } from 'constant';
import Button from 'components/Common/Button';
import SelectInput from 'components/Common/SelectInput';
import * as S from './EssentialInfo.style';

SessionJob.propTypes = {};

export default function SessionJob({}) {
  // TODO: 페이지가 빠져나가졌을 때 요청하기
  // const response = await uploadApi.uploadImage(formData);
  return (
    <S.Content>
      <h2>직업과 희망 기간을 선택해주세요.</h2>
      <S.SelectInputContainer>
        <SelectInput
          label="회망 기간"
          defaultOption={hopeSessionOption[0]}
          options={hopeSessionOption}
        />
        <SelectInput label="직업" defaultOption={jobOptions[0]} options={jobOptions} />
      </S.SelectInputContainer>
      <S.NextButtonContainer>
        <Button theme="primary" type="submit" disabled={false} customStyle={S.NextButton}>
          다음
        </Button>
        <span>필수 입력 항목입니다.</span>
      </S.NextButtonContainer>
    </S.Content>
  );
}
