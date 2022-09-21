import React from 'react';
import PropTypes from 'prop-types';
import { getUserInfo } from 'service/auth';
import { useCommentsAction, useCommentsState } from 'contexts/Comment/Comment.Provider';
import { commentInfoType } from 'types/comment.type';
import { parsedNumberToThreeDigits } from 'utils';
import { EditRootCommentForm } from '../CommentForm/Edit.CommentForm';
import * as S from '../style';

NestedCommentElement.propTypes = {
  commentId: PropTypes.number.isRequired,
  commentInfo: commentInfoType.isRequired,
};

export default function NestedCommentElement({ commentId, commentInfo }) {
  const { editTargetCommentId, postType } = useCommentsState();
  const { selectEditTargetComment, handleClickLikeThumb, isLikesContainUserId } =
    useCommentsAction();
  const userInfo = getUserInfo(); // {userId, name, profileImg}
  const loggedInUserId = userInfo?.userId;
  const {
    img,
    secret,
    writer: commenWriter,
    feeling: likedUserIds,
    content,
    parentId,
  } = commentInfo;
  const likesCount = likedUserIds.length;
  const isEditTargetComment = commentId === editTargetCommentId;

  const handleClickThumbSvg = () => {
    const idObj = { commentId, loggedInUserId, parentId };
    handleClickLikeThumb(isLikesContainUserId, postType, idObj);
  };

  return (
    <S.NestedCommentBox>
      <S.PublicCommentBox style={{ display: 'flex' }}>
        <S.CommentTitle>
          <h3>{commenWriter}</h3>
          <span>2022.12.31</span>
        </S.CommentTitle>
        <S.CommentContent>{content}</S.CommentContent>
      </S.PublicCommentBox>
      <S.CommentInfo>
        <S.SpecificInfo>
          <S.HeartSvg isFill={isLikesContainUserId} onClick={handleClickThumbSvg} />
          <span>{parsedNumberToThreeDigits(likesCount)}</span>
        </S.SpecificInfo>
        {!isEditTargetComment && (
          <S.SpecificInfo>
            <button onClick={() => selectEditTargetComment(commentId)}>댓글수정</button>
            <span>/</span>
            <button onClick={() => selectEditTargetComment(commentId)}>삭제하기</button>
          </S.SpecificInfo>
        )}
      </S.CommentInfo>
      {isEditTargetComment && (
        <EditRootCommentForm initialText={content} secret={secret} commentId={commentId} />
      )}
    </S.NestedCommentBox>
  );
}
