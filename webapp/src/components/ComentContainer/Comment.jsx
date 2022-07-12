import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { setDefaultProfileImage } from 'utils';
import { getUserCookie } from 'utils/cookie';
import CommentForm from './CommentForm';
import * as S from './style';

Comment.propTypes = {
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
  editTargetCommentId: PropTypes.number.isRequired,
  resetTarget: PropTypes.func.isRequired,
  setEditTargetCommentId: PropTypes.func.isRequired,
  handleSubmitEditComment: PropTypes.func.isRequired,
  handleClickDeleteButton: PropTypes.func.isRequired,
  handleClickLikeThumb: PropTypes.func.isRequired,
};

export default function Comment({
  id,
  isSecret,
  postId,
  postType,
  commentInfo,
  editTargetCommentId,
  resetTarget,
  setEditTargetCommentId,
  handleSubmitEditComment,
  handleClickDeleteButton,
  handleClickLikeThumb,
}) {
  const userInfo = getUserCookie(); // {name, img, id}
  const loggedInUserId = userInfo?.id;
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
                <button onClick={() => setEditTargetCommentId(id)}>수정</button>
              </S.ContentInfo>
            )}
            <S.LikeInfo>
              <S.ThumbSVG
                isFill={isLikesContainUserId}
                onClick={() =>
                  handleClickLikeThumb(id, loggedInUserId, isLikesContainUserId, parentId)
                }
              >
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
              submitCallback={handleSubmitEditComment}
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
