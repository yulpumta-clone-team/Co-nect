import React from 'react';
import PropTypes from 'prop-types';
import { getUserInfo } from 'service/auth';
import { useCommentsAction, useCommentsState } from 'contexts/Comment/Comment.Provider';
import { commentInfoType } from 'types/comment.type';
import * as S from '../style';
import { EditRootCommentForm } from '../CommentForm/Edit.CommentForm';

RootCommentElement.propTypes = {
  commentId: PropTypes.number.isRequired,
  commentInfo: commentInfoType.isRequired,
};

export default function RootCommentElement({ commentId, commentInfo }) {
  const { postType, editTargetCommentId } = useCommentsState();
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

  const handleClickTargetComment = () => selectEditTargetComment(commentId);

  const handleClickThumbSvg = () => {
    const idObj = { commentId, loggedInUserId, parentId };
    handleClickLikeThumb(isLikesContainUserId, postType, idObj);
  };

  return (
    <S.CommentBox>
      <S.NormalCommentBox style={{ display: 'flex' }}>
        <S.UserInfo>
          <img src={img} alt="profile" />
          <h3>{commenWriter}</h3>
        </S.UserInfo>
        {!isEditTargetComment && (
          <S.ContentInfo>
            <span>{content}</span>
            <button onClick={handleClickTargetComment}>수정</button>
          </S.ContentInfo>
        )}
        <S.LikeInfo>
          <S.ThumbSVG isFill={isLikesContainUserId} onClick={handleClickThumbSvg}>
            👍
          </S.ThumbSVG>
          <span>: {likesCount}</span>
        </S.LikeInfo>
      </S.NormalCommentBox>
      {isEditTargetComment && (
        <EditRootCommentForm initialText={content} secret={secret} commentId={commentId} />
      )}
    </S.CommentBox>
  );
}
