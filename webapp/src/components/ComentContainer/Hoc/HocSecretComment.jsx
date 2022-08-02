/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import PropTypes from 'prop-types';
import * as S from '../style';

HocSecretComment.propTypes = {
  isSecret: PropTypes.bool.isRequired,
  Component: PropTypes.func.isRequired,
};

// 비밀댓글인지 여부에 따른 컴포넌트 렌더링 관리
export default function HocSecretComment({ isSecret, Component }) {
  return function Wrapper(props) {
    return (
      <div>
        {isSecret ? (
          <S.SecretCommentBox>비밀댓글입니다.</S.SecretCommentBox>
        ) : (
          <Component {...props} />
        )}
      </div>
    );
  };
}
