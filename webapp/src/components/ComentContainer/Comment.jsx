/* eslint-disable react/require-default-props */
import React, { memo, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { setDefaultProfileImage } from 'utils';
import { getUserCookie } from 'utils/cookie';
import { Buttons, Container, EditForm, Image, Info, LikeThumbStyled } from './style';
import CommentForm from './CommentForm';

function Comment({
  id,
  isSecret,
  postId,
  postType,
  postWriter,
  commentInfo,
  editTargetCommentId,
  resetTarget,
  setEditTargetCommentId,
  handleSubmitEditComment,
  handleClickDeleteButton,
  handleChangeToSecret,
  handleClickLikeThumb,
}) {
  const userInfo = getUserCookie(); // {name, img, id}
  const loggedInUserName = userInfo?.name;
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

  const checkUserLikeTarget = useCallback((userId, targetLikesArray) => {
    const findUser = targetLikesArray.find((id) => id === userId);
    return !!findUser;
  }, []);

  const isLikesContainUserId = useMemo(
    () => checkUserLikeTarget(loggedInUserId, likedUserIds),
    [checkUserLikeTarget, likedUserIds, loggedInUserId],
  );

  const showSecretButtonText = useCallback(
    (secret) => (secret ? '공개로 전환' : '비공개로 전환'),
    [],
  );

  const CheckEditForm = useCallback(
    () =>
      isTargetEditCommnt ? (
        <CommentForm
          isChild
          postType={postType}
          postId={postId}
          initialText={content}
          submitCallback={handleSubmitEditComment}
          commentInfo={{ id, parentId }}
          hasCancelButton
          handleCancel={resetTarget}
        />
      ) : (
        <Info>
          <span>{content}</span>
        </Info>
      ),

    [
      content,
      handleSubmitEditComment,
      id,
      isTargetEditCommnt,
      parentId,
      postId,
      postType,
      resetTarget,
    ],
  );

  return (
    <Container isNested={parentId}>
      {isSecret ? (
        <div>비밀댓글입니다.</div>
      ) : (
        <div style={{ display: 'flex' }}>
          <Image>
            <img
              style={{ width: '50px', heigth: '50px' }}
              src={setDefaultProfileImage(img)}
              alt="profile"
            />
            <h3>{commenWriter}</h3>
          </Image>
          <CheckEditForm />
          <span>좋아요수: {likesCount}</span>
          <LikeThumbStyled
            isFill={isLikesContainUserId}
            onClick={() => handleClickLikeThumb(id, loggedInUserId, isLikesContainUserId)}
          />
          <Buttons>
            <button onClick={() => setEditTargetCommentId(id)}>수정</button>
            <button onClick={() => handleClickDeleteButton(id)}>삭제</button>
            <button onClick={() => handleChangeToSecret(id)}>{showSecretButtonText(secret)}</button>
          </Buttons>
        </div>
      )}
    </Container>
  );
}

Comment.propTypes = {
  id: PropTypes.number.isRequired,
  isSecret: PropTypes.bool.isRequired,
  postType: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
  postWriter: PropTypes.string.isRequired,
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
  handleChangeToSecret: PropTypes.func.isRequired,
  handleClickLikeThumb: PropTypes.func.isRequired,
};

export default memo(Comment);