import React from 'react';
import PropTypes from 'prop-types';
import LockClosedSvg from 'assets/icons/LockClosedSvg';
import * as S from '../style';

SecretCommentElement.propTypes = {
  isNested: PropTypes.bool.isRequired,
};

export default function SecretCommentElement({ isNested }) {
  return (
    <S.SecretCommentBox isNested={isNested}>
      <S.Lock isNested={isNested}>
        <LockClosedSvg />
      </S.Lock>
      <span>비밀 댓글입니다.</span>
    </S.SecretCommentBox>
  );
}
