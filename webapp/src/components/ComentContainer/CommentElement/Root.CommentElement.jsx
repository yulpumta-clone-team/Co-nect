import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { setDefaultProfileImage } from 'utils';
import { getUserInfo } from 'service/auth';
import { useCommentsAction, useCommentsState } from 'contexts/Comment/Comment.Provider';
import * as S from '../style';
import { EditRootCommentForm } from '../CommentForm/Edit.CommentForm';

RootCommentElement.propTypes = {
  commentId: PropTypes.number.isRequired,
  isSecret: PropTypes.bool.isRequired,
  commentInfo: PropTypes.shape({
    img: PropTypes.string.isRequired,
    secret: PropTypes.bool.isRequired,
    writer: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    feeling: PropTypes.array.isRequired,
    parentId: PropTypes.number,
  }),
};

export default function RootCommentElement({ commentId, isSecret, commentInfo }) {
  const { postType, editTargetCommentId } = useCommentsState();
  const { selectEditTargetComment, handleClickLikeThumb } = useCommentsAction();
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
  const isNested = Boolean(parentId);

  const handleClickTargetComment = () => {
    selectEditTargetComment(commentId);
  };

  const checkUserLikeTarget = useCallback((userId, targetLikesArray) => {
    const findUser = targetLikesArray.find((id) => id === userId);
    return !!findUser;
  }, []);

  const handleClickThumbSvg = () => {
    const idObj = { commentId, loggedInUserId, parentId };
    handleClickLikeThumb(isLikesContainUserId, postType, idObj);
  };

  const isLikesContainUserId = useMemo(
    () => checkUserLikeTarget(loggedInUserId, likedUserIds),
    [checkUserLikeTarget, likedUserIds, loggedInUserId],
  );

  return (
    <S.CommentBox isNested={isNested}>
      {isSecret ? (
        <S.SecretCommentBox>비밀댓글입니다.</S.SecretCommentBox>
      ) : (
        <>
          <S.NormalCommentBox style={{ display: 'flex' }}>
            <S.UserInfo>
              <img src={setDefaultProfileImage(img)} alt="profile" />
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
        </>
      )}
    </S.CommentBox>
  );
}
