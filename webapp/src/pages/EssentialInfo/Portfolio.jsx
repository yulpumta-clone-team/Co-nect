import React from 'react';
import TextInput from 'components/Common/TextInput';
import Button from 'components/Common/Button';
import * as S from './EssentialInfo.style';

Portfolio.propTypes = {};

export default function Portfolio({}) {
  return (
    <S.Content>
      <h2>포트폴리오를 업로드해주세요.</h2>
      <S.InputContainer>
        <TextInput
          name="Portfolio"
          placeholder="포트폴리오(url)"
          value=""
          onChange={() => {}}
          isError={false}
          helperText=""
        />
      </S.InputContainer>
      <S.NextButtonContainer>
        <Button theme="primary" type="submit" disabled={false} customStyle={S.NextButton}>
          다음
        </Button>
      </S.NextButtonContainer>
    </S.Content>
  );
}
