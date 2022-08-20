import React from 'react';
import PropTypes from 'prop-types';
import SelectInput from 'components/Common/SelectInput';
import Button from 'components/Common/Button';
import * as S from '../EssentialInfo.style';

BelongTeam.propTypes = {};

const belongTeamOptions = [
  { id: 0, label: '팀소속 ✅', value: '팀소속 ✅' },
  { id: 1, label: '팀소속 ❌', value: '팀소속 ❌' },
];

export default function BelongTeam({}) {
  return (
    <S.Content>
      <h2>팀 소속 여부를 알려주세요.</h2>
      <S.InputContainer>
        <SelectInput
          label="팀 소속 여부"
          defaultOption={belongTeamOptions[0]}
          options={belongTeamOptions}
        />
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
