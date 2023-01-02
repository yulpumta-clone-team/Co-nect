import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Common/Button';
import * as S from './callback.style';

ApiErrorCallback.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  forceRefetch: PropTypes.func.isRequired,
};

export default function ApiErrorCallback({ errorMessage, forceRefetch }) {
  return (
    <S.Container>
      <h1>{errorMessage}</h1>
      <Button theme="primary" onClick={forceRefetch} customStyle={S.Button}>
        재요청하기
      </Button>
    </S.Container>
  );
}
