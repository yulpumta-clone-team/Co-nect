import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Common/Button';
import TextArea from 'components/Common/TextArea';
import * as S from './EssentialInfo.style';

Introduction.propTypes = {};

// FIXME: 사용자가 어려 줄 입력했을 때 스타일 어떻게 처리할 것인지 결정해서 반영해야된다. 현재 여러 줄 입력하면 다음 버튼 아래로 넘어간다.
export default function Introduction({}) {
  return (
    <S.Content>
      <h2>자기소개를 입력해주세요.</h2>
      <S.InputContainer>
        <TextArea onChange={() => {}} placeholder="자기소개" value="" />
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
