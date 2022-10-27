import React from 'react';
import PropTypes from 'prop-types';
import { getUserInfo } from 'service/auth';
import { useCommentsAction, useCommentsState } from 'contexts/Comment/Comment.Provider';
import { commentInfoType } from 'types/comment.type';
import { parsedNumberToThreeDigits } from 'utils';
import HeartSvg from 'assets/icons/HeartSvg';
import EditRootCommentForm from '../CommentForm/Edit.CommentForm';
import SecretCommentElement from './Secret.CommentElement';
import * as S from '../style';

NestedCommentElement.propTypes = {
  commentId: PropTypes.number.isRequired,
  commentInfo: commentInfoType.isRequired,
  postWriter: PropTypes.string.isRequired,
};

export default function NestedCommentElement({ commentId, commentInfo, postWriter }) {
  const { editTargetCommentId, postType } = useCommentsState();
  const {
    isShowSecretComment,
    selectEditTargetComment,
    handleClickLikeThumb,
    isLikesContainUserId,
  } = useCommentsAction();
  const userInfo = getUserInfo(); // {userId, name, profileImg}
  const loggedInUserId = userInfo?.userId;
  const loggedInUserName = userInfo?.name;
  const {
    parentId,
    content,
    secret,
    userInfo: writerInfo,
    img,
    writer: commenWriter,
    feelings: likedUserIds,
  } = commentInfo;
  const { id: writerId, image: writerProfileImage, name: writerName } = writerInfo;
  const likesCount = likedUserIds.length;
  const isEditTargetComment = commentId === editTargetCommentId;

  const handleClickThumbSvg = () => {
    const idObj = { commentId, loggedInUserId, parentId };
    handleClickLikeThumb(isLikesContainUserId, postType, idObj);
  };
  const isSecret = isShowSecretComment(secret, postWriter, commenWriter, loggedInUserName);
  return (
    <S.NestedCommentBox>
      <S.PublicCommentBox style={{ display: 'flex' }}>
        <S.CommentTitle isNested>
          <h3>{writerName}</h3>
          <span>2022.12.31</span>
        </S.CommentTitle>
        {isSecret ? (
          <SecretCommentElement isNested />
        ) : (
          <S.CommentContent isNested>{content}</S.CommentContent>
        )}
      </S.PublicCommentBox>
      <S.CommentInfo>
        <S.SpecificInfo isNested>
          <S.HeartButton isNested isFill={isLikesContainUserId} onClick={handleClickThumbSvg}>
            <HeartSvg />
          </S.HeartButton>
          <span>{parsedNumberToThreeDigits(likesCount)}</span>
        </S.SpecificInfo>
        {!isEditTargetComment && (
          <S.SpecificInfo>
            <S.EditButton isNested onClick={() => selectEditTargetComment(commentId)}>
              댓글수정
            </S.EditButton>
            <span>/</span>
            <S.EditButton isNested onClick={() => selectEditTargetComment(commentId)}>
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
