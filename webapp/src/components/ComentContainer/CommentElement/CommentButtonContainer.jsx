import React from 'react';
import PropTypes from 'prop-types';
import { useCommentsAction, useCommentsState } from 'contexts/Comment/Comment.Provider';
import * as S from '../style';

CommentButtonContainer.propTypes = {
  isNested: PropTypes.bool.isRequired,
  isEditTargetComment: PropTypes.bool.isRequired,
  commentId: PropTypes.number.isRequired,
  writerId: PropTypes.number.isRequired,
};

export default function CommentButtonContainer({
  isNested,
  isEditTargetComment,
  commentId,
  writerId,
}) {
  const { postType } = useCommentsState();
  const { selectEditTargetComment, handleClickDeleteTargetComment, isCommentLoginUserWrote } =
    useCommentsAction();

  if (isEditTargetComment || isCommentLoginUserWrote(writerId)) return null;

  const handleClickTargetComment = () => selectEditTargetComment(commentId);

  const handleClickDeleteButton = () => {
    handleClickDeleteTargetComment({ postType, id: commentId });
  };

  return (
    <S.SpecificInfo>
      <S.EditButton isNested={isNested} onClick={handleClickTargetComment}>
        댓글수정
      </S.EditButton>
      <span>/</span>
      <S.EditButton isNested={isNested} onClick={handleClickDeleteButton}>
        삭제하기
      </S.EditButton>
    </S.SpecificInfo>
  );
}
