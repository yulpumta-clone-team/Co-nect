/* eslint-disable react/require-default-props */
import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import useInput from 'hooks/useInput';
import { setDefaultProfileImage } from 'utils';
import { getUserCookie } from 'utils/cookie';
import { Buttons, Container, EditForm, Image, Info } from './style';

function Comment({
  id,
  postId,
  postWriter,
  commentInfo,
  editTargetCommentId,
  setEditTargetCommentId,
  handleSubmitEditComment,
  handleClickDeleteButton,
  handleChangeToSecret,
}) {
  const userInfo = getUserCookie(); // {name, img, id}
  const loggedInUserName = userInfo?.name;
  const { img, secret, writer: commenWriter, feeling, content, parentId, replies } = commentInfo;
  const feelingCount = feeling.length;
  const isTargetEditCommnt = id === editTargetCommentId;
  const [editContent, onEditContentChange] = useInput(content);

  const showSecretButtonText = (secret) => (secret ? '공개로 전환' : '비공개로 전환');

  const checkSecretComment = (postWriterName, commentWriterName, loggedInUserName) => {
    // true: 가리기 , false: 보여주기
    if (!loggedInUserName) {
      return true;
    }
    const isSameCommentWriter = () => postWriterName === loggedInUserName;
    const isSamePostWriter = () => commentWriterName === loggedInUserName;
    if (isSameCommentWriter() || isSamePostWriter()) {
      return false;
    }

    return true;
  };

  const isShowSecretComment = (secret, postWriterName, commentWriterName, loggedInUserName) => {
    // secret ? 가리기 : 보여주기
    if (secret) {
      console.log(secret, postWriterName, commentWriterName, loggedInUserName);
      const isShow = checkSecretComment(postWriterName, commentWriterName, loggedInUserName);
      return isShow;
    }
    return false;
  };

  const handleEditSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const newCommentData = {
        writer: commenWriter,
        parentId,
        secret,
        content: editContent,
      };
      handleSubmitEditComment(newCommentData);
    },
    [commenWriter, editContent, handleSubmitEditComment, parentId, secret],
  );

  const checkEditForm = () =>
    isTargetEditCommnt ? (
      <EditForm onSubmit={handleEditSubmit}>
        <input type="text" value={editContent} onChange={onEditContentChange} />
        <button>수정완료</button>
      </EditForm>
    ) : (
      <Info>
        <span>{content}</span>
      </Info>
    );

  return (
    <Container>
      {isShowSecretComment(secret, postWriter, commenWriter, loggedInUserName) ? (
        <div>비밀댓글입니다.</div>
      ) : (
        <>
          <Image>
            <img
              style={{ width: '50px', heigth: '50px' }}
              src={setDefaultProfileImage(img)}
              alt="profile"
            />
            <h3>{commenWriter}</h3>
          </Image>
          {checkEditForm()}
          <span>좋아요수: {feelingCount}</span>
          <Buttons>
            <button onClick={() => setEditTargetCommentId(id)}>수정</button>
            <button onClick={() => handleClickDeleteButton(id)}>삭제</button>
            <button onClick={() => handleChangeToSecret(id)}>{showSecretButtonText(secret)}</button>
          </Buttons>
        </>
      )}
    </Container>
  );
}

Comment.propTypes = {
  id: PropTypes.number.isRequired,
  postId: PropTypes.number.isRequired,
  postWriter: PropTypes.string.isRequired,
  commentInfo: PropTypes.shape({
    img: PropTypes.string.isRequired,
    secret: PropTypes.bool.isRequired,
    writer: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    feeling: PropTypes.array.isRequired,
    replies: PropTypes.array.isRequired,
    parentId: PropTypes.number,
  }),
  editTargetCommentId: PropTypes.number.isRequired,
  setEditTargetCommentId: PropTypes.func.isRequired,
  handleSubmitEditComment: PropTypes.func.isRequired,
  handleClickDeleteButton: PropTypes.func.isRequired,
  handleChangeToSecret: PropTypes.func.isRequired,
};

export default memo(Comment);
