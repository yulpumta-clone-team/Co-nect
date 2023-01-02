import React from 'react';
import PropTypes from 'prop-types';
import LockClosedSvg from 'assets/icons/LockClosedSvg';
import { useCommentsAction } from 'contexts/Comment/Comment.Provider';
import * as S from '../style';

SecretCommentElement.propTypes = {
  isNested: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
  isSecret: PropTypes.bool.isRequired,
  postWriterId: PropTypes.number.isRequired,
  writerId: PropTypes.number.isRequired,
};

export default function SecretCommentElement({
  isNested,
  content,
  isSecret,
  postWriterId,
  writerId,
}) {
  const { isShowSecretComment } = useCommentsAction();
  const isShowSecret = isShowSecretComment(isSecret, postWriterId, writerId);
  if (isShowSecret) {
    return <S.CommentContent isNested>{content}</S.CommentContent>;
  }
  return (
    <S.SecretCommentBox isNested={isNested}>
      <S.Lock isNested={isNested}>
        <LockClosedSvg />
      </S.Lock>
      <span>비밀 댓글입니다.</span>
    </S.SecretCommentBox>
  );
}
