import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { setDefaultProfileImage } from 'utils';
import { getUserInfo } from 'service/auth';
import { useCommentsAction, useCommentsState } from 'contexts/Comment/Comment.Provider';
import CommentForm from '../CommentForm';
import * as S from '../style';

NestedCommentElement.propTypes = {
  id: PropTypes.number.isRequired,
  isSecret: PropTypes.bool.isRequired,
  postType: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
  commentInfo: PropTypes.shape({
    img: PropTypes.string.isRequired,
    secret: PropTypes.bool.isRequired,
    writer: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    feeling: PropTypes.array.isRequired,
    parentId: PropTypes.number,
  }),
  handleClickDeleteButton: PropTypes.func.isRequired,
  handleClickLikeThumb: PropTypes.func.isRequired,
};

export default function NestedCommentElement({
  id,
  isSecret,
  postId,
  postType,
  commentInfo,
  handleClickDeleteButton,
  handleClickLikeThumb,
}) {
  const { editTargetCommentId } = useCommentsState();
  const { selectEditTargetComment, resetTarget, patchCommentApi } = useCommentsAction();
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
  const isTargetEditCommnt = id === editTargetCommentId;
  const isNested = Boolean(parentId);

  const handleClickThumbSvg = () => {
    const idObj = { id, loggedInUserId, parentId };
    handleClickLikeThumb(isLikesContainUserId, postType, idObj);
  };

  const checkUserLikeTarget = useCallback((userId, targetLikesArray) => {
    const findUser = targetLikesArray.find((id) => id === userId);
    return !!findUser;
  }, []);

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
            {!isTargetEditCommnt && (
              <S.ContentInfo>
                <span>{content}</span>
                <button onClick={() => selectEditTargetComment(id)}>수정</button>
              </S.ContentInfo>
            )}
            <S.LikeInfo>
              <S.ThumbSVG isFill={isLikesContainUserId} onClick={handleClickThumbSvg}>
                👍
              </S.ThumbSVG>
              <span>: {likesCount}</span>
            </S.LikeInfo>
          </S.NormalCommentBox>
          {isTargetEditCommnt && (
            <CommentForm
              postType={postType}
              postId={postId}
              initialText={content}
              submitCallback={patchCommentApi}
              commentInfo={{ id, parentId, secret }}
              hasCancelButton
              hasDeleteButton
              handleCancel={resetTarget}
              handleClickDeleteButton={handleClickDeleteButton}
            />
          )}
        </>
      )}
    </S.CommentBox>
  );
}
