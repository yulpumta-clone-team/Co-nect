import React from 'react';
import PropTypes from 'prop-types';
import { useCommentsState } from 'contexts/Comment/Comment.Provider';
import { replyCommentInfoType } from 'types/comment.type';
import { parsedNumberToThreeDigits } from 'utils';
import { ISOToyyyymmdd } from 'service/etc/time.util';
import EditRootCommentForm from '../CommentForm/Edit.CommentForm';
import SecretCommentElement from './Secret.CommentElement';
import CommentLikeSvg from './CommentLikeSvg';
import * as S from '../style';
import CommentButtonContainer from './CommentButtonContainer';

NestedCommentElement.propTypes = {
  commentInfo: replyCommentInfoType.isRequired,
  postWriterId: PropTypes.number.isRequired,
};

export default function NestedCommentElement({ commentInfo, postWriterId }) {
  const { editTargetCommentId } = useCommentsState();
  const {
    id: commentId,
    parentId,
    content,
    secret,
    userInfo: writerInfo,
    updatedAt,
    feelings: likedUserIds,
  } = commentInfo;
  const { id: writerId, image: writerProfileImage, name: writerName } = writerInfo;
  const likesCount = likedUserIds.length;
  const isEditTargetComment = commentId === editTargetCommentId;

  return (
    <S.NestedCommentBox>
      <S.PublicCommentBox>
        <S.CommentTitle isNested>
          <h3>{writerName}</h3>
          <span>{ISOToyyyymmdd(updatedAt)}</span>
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
        <CommentButtonContainer
          isNested
          isEditTargetComment={isEditTargetComment}
          commentId={commentId}
          writerId={writerId}
        />
      </S.CommentInfo>
      {isEditTargetComment && (
        <EditRootCommentForm initialText={content} secret={secret} commentId={commentId} />
      )}
    </S.NestedCommentBox>
  );
}
