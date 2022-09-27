import React from 'react';
import PropTypes from 'prop-types';
import * as S from '../style';

SecretCommentElement.propTypes = {
  isNested: PropTypes.bool.isRequired,
};

export default function SecretCommentElement({ isNested }) {
  return (
    <S.SecretCommentBox isNested={isNested}>
      <S.LockSvg isNested={isNested} />
      <span>비밀 댓글입니다.</span>
    </S.SecretCommentBox>
  );
}
