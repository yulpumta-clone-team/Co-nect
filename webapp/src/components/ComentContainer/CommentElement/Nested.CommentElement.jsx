import React from 'react';
import PropTypes from 'prop-types';
import { useCommentsAction, useCommentsState } from 'contexts/Comment/Comment.Provider';
import { replyCommentInfoType } from 'types/comment.type';
import { parsedNumberToThreeDigits } from 'utils';
import EditRootCommentForm from '../CommentForm/Edit.CommentForm';
import SecretCommentElement from './Secret.CommentElement';
import CommentLikeSvg from './CommentLikeSvg';
import * as S from '../style';

NestedCommentElement.propTypes = {
  commentInfo: replyCommentInfoType.isRequired,
  postWriterId: PropTypes.number.isRequired,
};

export default function NestedCommentElement({ commentInfo, postWriterId }) {
  const { editTargetCommentId, postType } = useCommentsState();
  const { selectEditTargetComment, handleClickDeleteTargetComment } = useCommentsAction();
  const {
    id: commentId,
    parentId,
    content,
    secret,
    userInfo: writerInfo,
    img,
    feelings: likedUserIds,
  } = commentInfo;
  const { id: writerId, image: writerProfileImage, name: writerName } = writerInfo;
  const likesCount = likedUserIds.length;
  const isEditTargetComment = commentId === editTargetCommentId;

  const handleClickDeleteButton = () => {
    handleClickDeleteTargetComment({ postType, id: commentId });
  };

  return (
    <S.NestedCommentBox>
      <S.PublicCommentBox>
        <S.CommentTitle isNested>
          <h3>{writerName}</h3>
          <span>2022.12.31</span>
        </S.CommentTitle>
        <SecretCommentElement
          isNested
          content={content}
          isSecret={secret}
          postWriterId={postWriterId}
          writerId={writerId}
        />
      </S.PublicCommentBox>
      <S.CommentInfo>
        <S.SpecificInfo isNested>
          <CommentLikeSvg commentId={commentId} parentId={parentId} likedUserIds={likedUserIds} />
          <span>{parsedNumberToThreeDigits(likesCount)}</span>
        </S.SpecificInfo>
        {!isEditTargetComment && (
          <S.SpecificInfo>
            <S.EditButton isNested onClick={() => selectEditTargetComment(commentId)}>
              댓글수정
            </S.EditButton>
            <span>/</span>
            <S.EditButton isNested onClick={handleClickDeleteButton}>
              삭제하기
            </S.EditButton>
          </S.SpecificInfo>
        )}
      </S.CommentInfo>
      {isEditTargetComment && (
        <EditRootCommentForm initialText={content} secret={secret} commentId={commentId} />
      )}
    </S.NestedCommentBox>
  );
}
